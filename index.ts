import fs from 'fs';
import fse from 'fs-extra';
import openBrowser from 'open';
import path from 'path';

import {
  attachDirPath,
  dataDirPath,
  getOptions,
  pickData,
  readAttachInfos,
  resourceDirName,
  tempDirPath,
} from './helper';

const localTemplateHTMLPath = path.resolve(__dirname, './dist/index.html');
const localTemplateJSPath = path.resolve(__dirname, './dist/index.js');

function mkdirs(dirPath: string) {
  if (!fs.existsSync(path.dirname(dirPath))) {
    mkdirs(path.dirname(dirPath));
  }
  fs.mkdirSync(dirPath);
}

function imgToBase64(imgPath: string) {
  const fileName = path.resolve(imgPath);
  if (fs.statSync(fileName).isFile()) {
    const fileData = fs.readFileSync(fileName).toString('base64');
    return `data:image/${fileName.split('.').pop()};base64,${fileData}`;
  }
  return undefined;
}

// for #32
const formatCustomInfo = (customInfos: string) => {
  if (typeof customInfos !== 'string') return customInfos;

  try {
    const infos = JSON.parse(customInfos);
    if (infos) {
      return Object.entries(infos).map(([key, value]) => ({
        title: key,
        value,
      }));
    }
  } catch (err) {
    console.warn(
      'the value of Custom info env must be a json string point to an Object',
      err
    );
  }
  return undefined;
};

const removeUnusedData = (result) => {
  const res = pickData(result, ['coverageMap', 'openHandles', 'snapshot']);
  const testResults = result.testResults.map(item => pickData(item, ['openHandles', 'snapshot']));
  return { ...res, testResults };
};

const filenameErrorWordings = `
jest-html-reporters error: 
    config error for 【filename】option!
    this config just for filename, should not including the char */*
    if you want put out report result to specific path,
    please using 【publicPath】. 
`;

// my-custom-reporter.js
class MyCustomReporter {
  _globalConfig;
  _options;
  _publishResourceDir: string;

  constructor(globalConfig, options) {
    const { filename = '' } = options;
    if (filename.includes('/')) {
      throw new Error(filenameErrorWordings);
    }
    this._globalConfig = { ...globalConfig };
    this._options = getOptions(options);
    this._publishResourceDir = path.resolve(path.resolve(this._options.publicPath, resourceDirName));
    this.init();
  }

  async onRunComplete(contexts, results) {
    const {
      publicPath,
      filename,
      logoImgPath,
      customInfos,
      openReport,
      failureMessageOnly,
    } = this._options;
    const logoImg = logoImgPath ? imgToBase64(logoImgPath) : undefined;
    results.config = this._globalConfig;
    results.endTime = Date.now();
    results._reporterOptions = {
      ...this._options,
      logoImg,
      customInfos: formatCustomInfo(customInfos),
    };
    const attachInfos = await readAttachInfos(
      publicPath,
    );
    const openIfRequested = (filePath) => {
      if (openReport) {
        openBrowser(filePath, openReport === true ? {} : openReport);
      }
    };
    results.attachInfos = attachInfos;
    fs.existsSync(publicPath) === false && publicPath && mkdirs(publicPath);

    // filter normal case on failure message only mode
    if (failureMessageOnly) {
      results.testResults = results.testResults.filter(
        (i) => !!i.failureMessage
      );
    }

    const data = JSON.stringify(removeUnusedData(results));
    const filePath = path.resolve(publicPath, filename);
    // fs.writeFileSync('./src/devMock.json', data);
    fs.writeFileSync(path.resolve(this._publishResourceDir, 'result.js'), `window.jest_html_reporters_callback__(${data})`, 'utf-8');
    fs.copyFileSync(localTemplateHTMLPath, filePath);
    fs.copyFileSync(localTemplateJSPath, path.resolve(this._publishResourceDir, 'index.js'));
    console.log('📦 reporter is created on:', filePath);
    openIfRequested(filePath);

    this.removeTempDir();
  }

  init() {
    this.initAttachDir();
    this.initCoverageDirectory();
  }

  initCoverageDirectory() {
    if (this._globalConfig.collectCoverage && this._globalConfig.coverageDirectory) {
      this._globalConfig.coverageDirectory = path.relative(this._options.publicPath, this._globalConfig.coverageDirectory);
    }
  }

  initAttachDir() {
    this.removeTempDir();
    this.removeAttachDir();
    fse.mkdirpSync(dataDirPath);
    fse.mkdirpSync(attachDirPath);
    fse.mkdirpSync(this._publishResourceDir);
  }

  removeTempDir() {
    fse.removeSync(tempDirPath);
  }

  removeAttachDir() {
    fse.removeSync(
      this._publishResourceDir
    );
  }
}

module.exports = MyCustomReporter;
