import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { AggregatedResult } from '@jest/test-result';

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
  description: string | object;
  context?: any;
  bufferFormat?: string;
}

type TAttachObject = {
  testPath: string;
  testName: string;
  description: string | object;
  createTime: number;
  extName?: string;
  filePath?: string;
  fileName?: string;
};

export const addAttach = async ({
  attach,
  description: descriptionRaw,
  context,
  bufferFormat = 'jpg',
}: IAddAttachParams) => {
  const description = getSerializableContent(descriptionRaw);

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
    const attachObject: TAttachObject = {
      createTime,
      testPath,
      testName,
      filePath: attach,
      description,
      extName: path.extname(attach),
    };
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
  message: string | object;
  context?: any;
}
/**
 *
 * @param {string} message
 * @param {object} context. Optional. It contains custom configs
 */
export const addMsg = async ({ message, context }: IAddMsgParams) => {
  const description = getSerializableContent(message);
  const { testPath, testName } = getJestGlobalData(context);
  const createTime = Date.now();
  const fileName = generateRandomString();
  const attachObject: TAttachObject = {
    createTime,
    testPath,
    testName,
    description,
  };
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

export const readAttachInfos = async (
  publicPath: string,
  publicRelativePath: string
) => {
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
      await fs.copy(attachDirPath, publicPath);
    }

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
      if (!result[testPath][attachMappingName]) {
        result[testPath][attachMappingName] = [];
      }

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
const STRIP_SKIPPED_TEST = 'stripSkippedTest';

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
    JEST_HTML_REPORTERS_STRIP_SKIPPED_TEST: STRIP_SKIPPED_TEST,
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
    [STRIP_SKIPPED_TEST]: false,
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

export const copyAndReplace = ({
  tmpPath,
  outPutPath,
  pattern,
  newSubstr,
}: {
  tmpPath: string;
  outPutPath: string;
  pattern: string | RegExp;
  newSubstr: string;
}) => {
  const data = fs.readFileSync(tmpPath, { encoding: 'utf8' });
  const res = data.replace(pattern, () => newSubstr);
  fs.writeFileSync(outPutPath, res);
};

const rootDirVariable = '<rootDir>';
export const replaceRootDirVariable = (
  publicPath: string,
  rootDirPath: string
) => {
  if (!publicPath.startsWith(rootDirVariable)) {
    return publicPath;
  }

  return publicPath.replace(rootDirVariable, rootDirPath);
};

interface StructureMetaData {
  keys: (string | [string, StructureMetaData])[];
}

const usingStructure: StructureMetaData = {
  keys: [
    'numFailedTestSuites',
    'numFailedTests',
    'numPassedTestSuites',
    'numPassedTests',
    'numPendingTestSuites',
    'numPendingTests',
    'numRuntimeErrorTestSuites',
    'numTodoTests',
    'numTotalTestSuites',
    'numTotalTests',
    'startTime',
    'success',
    [
      'testResults',
      {
        keys: [
          'numFailingTests',
          'numPassingTests',
          'numPendingTests',
          'numTodoTests',
          'perfStats',
          'testFilePath',
          'failureMessage',
          [
            'testResults',
            {
              keys: [
                'ancestorTitles',
                'duration',
                'failureMessages',
                'fullName',
                'status',
                'title',
              ],
            },
          ],
        ],
      },
    ],
  ],
};

const basisClone = (obj: any, structure: StructureMetaData) => {
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => basisClone(item, structure));
  }

  const { keys } = structure;
  const res = {};
  keys.forEach((item) => {
    if (typeof item === 'string') {
      res[item] = obj[item];
    } else {
      const [key, innerStructure] = item;
      res[key] = basisClone(obj[key], innerStructure);
    }
  });
  return res;
};

export const deepClone = <T>(obj: T): T => {
  const res = basisClone(obj, usingStructure);
  return JSON.parse(JSON.stringify(res));
};

const getSerializableContent = (content: string | object) => {
  if (typeof content === 'string') return content;
  return JSON.stringify(content, null, 2);
};

export const filterSkipTests = (obj: AggregatedResult): AggregatedResult => {
  obj.testResults.forEach((item) => {
    item.numPendingTests = 0;
    item.testResults = item.testResults.filter(
      (test) => !(test.status === 'skipped' || test.status === 'pending')
    );
  });
  obj.testResults = obj.testResults.filter(
    (i) => !(i.skipped || i.testResults.length === 0)
  );
  return obj;
};
