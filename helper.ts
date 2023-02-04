import stringify from 'fast-safe-stringify';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';

let username: string = '';
try {
  username = os.userInfo().username;
} catch (err) {
  console.log(err);
}

export const tempDirPath = path.resolve(
  process.env.JEST_HTML_REPORTERS_TEMP_DIR_PATH || os.tmpdir(),
  `${username}-${Buffer.from(process.cwd()).toString('base64')}`,
  'jest-html-reporters-temp'
);

export const dataDirPath = path.resolve(tempDirPath, './data');
export const attachDirPath = path.resolve(tempDirPath, './images');

export const resourceDirName = './jest-html-reporters-attach';

interface IAddAttachParams {
  attach: string | Buffer;
  description: string;
  context?: any;
  bufferFormat?: string;
}

type TAttachObject = {
  testPath: string;
  testName: string;
  description: string;
  createTime: number;
  extName?: string;
  filePath?: string;
  fileName?: string;
};

export const addAttach = async ({ attach, description, context, bufferFormat = 'jpg' } : IAddAttachParams) => {
  const { testPath, testName } = getJestGlobalData(context);
  // type check
  if (typeof attach !== 'string' && !Buffer.isBuffer(attach)) {
    console.error(
      `[jest-html-reporters]: Param attach error, not a buffer or string, pic ${testName} - ${description} log failed.`
    );
    return;
  }
  const createTime = Date.now();
  const fileName = generateRandomString();
  if (typeof attach === 'string') {
    const attachObject: TAttachObject = { createTime, testPath, testName, filePath: attach, description, extName: path.extname(attach) };
    await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject);
  }

  if (Buffer.isBuffer(attach)) {
    const path = `${attachDirPath}/${fileName}.${bufferFormat}`;
    try {
      await fs.writeFile(path, attach);
      const attachObject: TAttachObject = {
        createTime,
        testPath,
        testName,
        fileName: `${fileName}.${bufferFormat}`,
        description,
        extName: `.${bufferFormat}`,
      };
      await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject);
    } catch (err) {
      console.error(err);
      console.error(
        `[jest-html-reporters]: Param attach error, can not save as a image, pic ${testName} - ${description} log failed.`
      );
    }
  }
};

interface IAddMsgParams {
  message: string;
  context: any;
}
/**
 *
 * @param {string} message
 * @param {object} context. Optional. It contains custom configs
 */
export const addMsg = async ({ message, context }: IAddMsgParams) => {
  const { testPath, testName } = getJestGlobalData(context);
  const createTime = Date.now();
  const fileName = generateRandomString();
  const attachObject: TAttachObject = { createTime, testPath, testName, description: message };
  await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject);
};

const getJestGlobalData = (globalContext) => {
  let testPath = '';
  let currentTestName = '';
  const context = globalContext || global;
  [...Object.getOwnPropertySymbols(context)].forEach((key) => {
    if (context[key] && context[key].state && context[key].matchers) {
      const state = context[key].state || {};
      testPath = state.testPath;
      currentTestName = state.currentTestName;
    }
  });
  return { testPath, testName: currentTestName };
};

const generateRandomString = () => `${Date.now()}${Math.random()}`;

export const readAttachInfos = async (publicPath: string, publicRelativePath: string) => {
  const result: any = {};
  try {
    const exist = await fs.pathExists(dataDirPath);

    if (!exist) {
      console.info(
        'Temp folder not exist, means that attach Infos may append unsuccessful'
      );
      return result;
    }

    const attachData = await fs.readdir(dataDirPath);
    const dataList: TAttachObject[] = await Promise.all(
      attachData.map((data) =>
        fs.readJSON(`${dataDirPath}/${data}`, { throws: false })
      )
    );
    const attachFiles = await fs.readdir(attachDirPath);
    if (attachFiles.length) {
      result.hasAttachFiles = true;
      await fs.copy(attachDirPath, publicPath)
    };

    dataList.forEach((attachObject) => {
      if (!attachObject) return;

      const {
        testPath,
        testName,
        filePath,
        description,
        fileName,
        createTime,
        extName,
      } = attachObject;
      const attachMappingName = testName || 'jest-html-reporters-file-attach';

      if (!result[testPath]) result[testPath] = {};
      if (!result[testPath][attachMappingName]) { result[testPath][attachMappingName] = []; }

      result[testPath][attachMappingName].push({
        filePath: fileName ? `${publicRelativePath}/${fileName}` : filePath,
        description: description || '',
        createTime,
        extName,
      });
    });
  } catch (err) {
    console.error(err);
    console.error('[jest-html-reporters]: parse attach failed!');
  }

  return result;
};

// For options
const PUBLIC_PATH = 'publicPath';
const FILE_NAME = 'filename';
const EXPAND = 'expand';
const PAGE_TITLE = 'pageTitle';
const LOGO_IMG_PATH = 'logoImgPath';
const HIDE_ICON = 'hideIcon';
const CUSTOM_INFOS = 'customInfos';
const TEST_COMMAND = 'testCommand';
const OPEN_REPORT = 'openReport';
const FAILURE_MESSAGE_ONLY = 'failureMessageOnly';
const ENABLE_MERGE_DATA = 'enableMergeData';
const DATA_MERGE_LEVEL = 'dataMergeLevel';
const INLINE_SOURCE = 'inlineSource';
const URL_FOR_TEST_FILES = 'urlForTestFiles';
const DARK_THEME = 'darkTheme';
const INCLUDE_CONSOLE_LOG = 'includeConsoleLog';


const constants = {
  ENVIRONMENT_CONFIG_MAP: {
    JEST_HTML_REPORTERS_PUBLIC_PATH: PUBLIC_PATH,
    JEST_HTML_REPORTERS_FILE_NAME: FILE_NAME,
    JEST_HTML_REPORTERS_EXPAND: EXPAND,
    JEST_HTML_REPORTERS_PAGE_TITLE: PAGE_TITLE,
    JEST_HTML_REPORTERS_LOGO_IMG_PATH: LOGO_IMG_PATH,
    JEST_HTML_REPORTERS_HIDE_ICON: HIDE_ICON,
    JEST_HTML_REPORTERS_CUSTOM_INFOS: CUSTOM_INFOS,
    JEST_HTML_REPORTERS_TEST_COMMAND: TEST_COMMAND,
    JEST_HTML_REPORTERS_OPEN_REPORT: OPEN_REPORT,
    JEST_HTML_REPORTERS_FAILURE_MESSAGE_ONLY: FAILURE_MESSAGE_ONLY,
    JEST_HTML_REPORTERS_ENABLE_MERGE_DATA: ENABLE_MERGE_DATA,
    JEST_HTML_REPORTERS_DATA_MERGE_LEVEL: DATA_MERGE_LEVEL,
    JEST_HTML_REPORTERS_INLINE_SOURCE: INLINE_SOURCE,
    JEST_HTML_REPORTERS_URL_FOR_TEST_FILES: URL_FOR_TEST_FILES,
    JEST_HTML_REPORTERS_DARK_THEME: DARK_THEME,
    JEST_HTML_REPORTERS_INCLUDE_CONSOLE_LOG: INCLUDE_CONSOLE_LOG,
  },
  DEFAULT_OPTIONS: {
    [PUBLIC_PATH]: process.cwd(),
    [FILE_NAME]: 'jest_html_reporters.html',
    [EXPAND]: false,
    [PAGE_TITLE]: '',
    [LOGO_IMG_PATH]: undefined,
    [HIDE_ICON]: false,
    [CUSTOM_INFOS]: undefined,
    [TEST_COMMAND]: '',
    [OPEN_REPORT]: process.env.NODE_ENV === 'development',
    [FAILURE_MESSAGE_ONLY]: 0,
    [ENABLE_MERGE_DATA]: false,
    [DATA_MERGE_LEVEL]: 1,
    [INLINE_SOURCE]: false,
    [URL_FOR_TEST_FILES]: '',
    [DARK_THEME]: false,
    [INCLUDE_CONSOLE_LOG]: false,
  },
};

function getEnvOptions() {
  const options = {};
  for (const name in constants.ENVIRONMENT_CONFIG_MAP) {
    if (process.env[name]) {
      options[constants.ENVIRONMENT_CONFIG_MAP[name]] = process.env[name];
    }
  }
  return options;
}

export const getOptions = (reporterOptions = {}) =>
  Object.assign(
    {},
    constants.DEFAULT_OPTIONS,
    reporterOptions,
    getEnvOptions()
  );

export const copyAndReplace = ({ tmpPath, outPutPath, pattern, newSubstr }: {
  tmpPath: string;
  outPutPath: string;
  pattern: string | RegExp;
  newSubstr: string;
}) => {
  const data = fs.readFileSync(tmpPath, { encoding: 'utf8' });
  const res = data.replace(pattern, () => newSubstr);
  fs.writeFileSync(outPutPath, res);
};

export const pickData = (obj: Object, filterKeys: string[]) => {
  const res = {};
  Object.keys(obj).forEach(key => {
    if (!filterKeys.includes(key)) {
      res[key] = obj[key];
    }
  });
  return res;
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(stringify(obj));
};

const rootDirVariable = '<rootDir>';
export const replaceRootDirVariable = (publicPath: string, rootDirPath: string) => {
  if (!publicPath.startsWith(rootDirVariable)) {
    return publicPath;
  };

  return publicPath.replace(rootDirVariable, rootDirPath);
};
