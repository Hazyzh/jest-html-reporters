import fs from 'fs';
import fse from 'fs-extra';
import openBrowser from 'open';
import path from 'path';

import {
  attachDirPath,
  copyAndReplace,
  dataDirPath,
  deepClone,
  getOptions,
  pickData,
  readAttachInfos,
  replaceRootDirVariable,
  resourceDirName,
  tempDirPath,
} from './helper';

const localTemplateHTMLPath = path.resolve(__dirname, './dist/index.html');
const localTemplateSingleHTMLPath = path.resolve(__dirname, './dist/singleFile.html');
const localTemplateJSPath = path.resolve(__dirname, './dist/index.js');
const packageReplaceReg = /<<<JEST-HTML-REPLACE-PLACEHOLDER>>>/g;
const packageSingleReplaceReg = /&JEST-HTML-REPLACE-Single-PLACEHOLDER&/g;

function mkdirs(dirPath: string) {
  if (!fs.existsSync(path.dirname(dirPath))) {
    mkdirs(path.dirname(dirPath));
  }
  fs.mkdirSync(dirPath);
}

function imgToBase64(imgPath: string) {
  const fileName = path.resolve(imgPath);
  if (fs.statSync(fileName).isFile()) {
    const fileMimeType = path.extname(imgPath).toLowerCase();
    const fileData = fs.readFileSync(fileName).toString('base64');
    return `data:image/${fileMimeType === 'svg' ? 'svg+xml' : fileMimeType};base64,${fileData}`;
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
  _resourceRelativePath: string;

  constructor(globalConfig, options) {
    const { filename = '' } = options;
    if (filename.includes('/')) {
      throw new Error(filenameErrorWordings);
    }
    this._globalConfig = { ...globalConfig };
    this._options = getOptions(options);
    this._options.publicPath = replaceRootDirVariable(this._options.publicPath, globalConfig.rootDir);
    this._resourceRelativePath = `${resourceDirName}/${path.basename(this._options.filename, '.html')}`;
    this._publishResourceDir = path.resolve(this._options.publicPath, this._resourceRelativePath);
    this.init();
  }

  async onRunComplete(contexts, originalResults) {
    const results = deepClone(originalResults);
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
      this._publishResourceDir,
      this._resourceRelativePath,
    );
    const openIfRequested = (filePath) => {
      if (openReport) {
        openBrowser(filePath, openReport === true ? {} : openReport);
      }
    };
    console.log('attachInfos', attachInfos);
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
    if (!this._options.inlineSource) {
      fs.writeFileSync(path.resolve(this._publishResourceDir, 'result.js'), `window.jest_html_reporters_callback__(${data})`);
      // html
      copyAndReplace({
        tmpPath: localTemplateHTMLPath,
        outPutPath: filePath,
        pattern: packageReplaceReg,
        newSubstr: this._resourceRelativePath
      });
      // js
      copyAndReplace({
        tmpPath: localTemplateJSPath,
        outPutPath: path.resolve(this._publishResourceDir, 'index.js'),
        pattern: packageReplaceReg,
        newSubstr: this._resourceRelativePath
      });
    } else {
      // html
      copyAndReplace({
        tmpPath: localTemplateSingleHTMLPath,
        outPutPath: filePath,
        pattern: packageSingleReplaceReg,
        newSubstr: data
      });

      // remove temp dir
      if (!attachInfos.hasAttachFiles) {
        fse.removeSync(
          path.resolve(this._options.publicPath, resourceDirName)
        );
      }
    }

    console.log('📦 reporter is created on:', filePath);
    openIfRequested(filePath);

    this.removeTempDir();
  }

  init() {
    this.initAttachDir();
    this.initCoverageDirectory();
  }

  initCoverageDirectory() {
    const { collectCoverage, coverageDirectory, coverageReporters } = this._globalConfig;
    if (collectCoverage && coverageDirectory) {
      const coverageDirectoryPath = path.relative(this._options.publicPath, this._globalConfig.coverageDirectory);

      if (coverageReporters.find(type => type === 'lcov')) {
        this._globalConfig.coverageLinkPath = path.join(coverageDirectoryPath, './lcov-report/index.html');
        return;
      }

      if (coverageReporters.find(type => type === 'html')) {
        this._globalConfig.coverageLinkPath = path.join(coverageDirectoryPath, './index.html');
      }
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
