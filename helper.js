const fs = require('fs-extra')
const dataDirPath = './temp/data'
const attachDirPath = './temp/images'
const distDirName = './jest-html-reporters-attach'
const path = require('path')

/**
 *
 * @param {Buffer | string} attach
 * @param {string} description
 */
const addAttach = async (attach, description) => {
  const { testPath, testName } = getJestGlobalData()
  // type check
  if (typeof attach !== 'string' && !Buffer.isBuffer(attach)) {
    console.error(`[jest-html-reporters]: Param attach error, not a buffer or string, pic ${testName} - ${description} log failed.`)
    return
  }
  const fileName = generateRandomString()
  if (typeof attach === 'string') {
    const attachObject = { testPath, testName, filePath: attach, description }
    await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject)
  }

  if (Buffer.isBuffer(attach)) {
    const path = `${attachDirPath}/${fileName}.jpg`
    try {
      await fs.writeFile(path, attach)
      const attachObject = { testPath, testName, fileName: `${fileName}.jpg`, description }
      await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject)
    } catch (err) {
      console.error(err)
      console.error(`[jest-html-reporters]: Param attach error, can not save as a image, pic ${testName} - ${description} log failed.`)
    }
  }
}

/**
 *
 * @param {string} message
 */
const addMsg = async (message) => {
  const { testPath, testName } = getJestGlobalData()
  const fileName = generateRandomString()
  const attachObject = { testPath, testName, description: message }
  await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject)
}

const getJestGlobalData = () => {
  let testPath = ''
  let currentTestName = ''
  ;[...Object.getOwnPropertySymbols(global)].forEach(key => {
    if (global[key].state && global[key].matchers) {
      const state = global[key].state || {}
      testPath = state.testPath
      currentTestName = state.currentTestName
    }
  })
  return { testPath, testName: currentTestName }
}

const generateRandomString = () => `${Date.now()}${Math.random()}`

const readAttachInfos = async (publicPath) => {
  const result = {}
  try {
    const attachData = await fs.readdir(dataDirPath)
    const dataList = await Promise.all(attachData.map(data => fs.readJSON(`${dataDirPath}/${data}`, { throws: false })))
    const outPutDir = path.resolve(publicPath, distDirName)
    const attachFiles = await fs.readdir(attachDirPath)
    if (attachFiles.length) await fs.copy(attachDirPath, outPutDir)

    dataList.forEach(attachObject => {
      if (!attachObject) return

      const { testPath, testName, filePath, description, fileName } = attachObject
      if (!result[testPath]) result[testPath] = {}
      if (!result[testPath][testName]) result[testPath][testName] = []

      result[testPath][testName].push({
        filePath: fileName ? `${distDirName}/${fileName}` : filePath,
        description: description || '',
      })
    })
  } catch (err) {
    console.error(err)
    console.error(`[jest-html-reporters]: parse attach failed!`)
  }

  return result
}

// For options
const PUBLIC_PATH = 'publicPath'
const FILE_NAME = 'filename'
const EXPAND = 'expand'
const PAGE_TITLE = 'pageTitle'
const LOGO_IMG_PATH = 'logoImgPath'
const HIDE_ICON = 'hideIcon'
const CUSTOM_INFOS = 'customInfos'
const TEST_COMMAND = 'testCommand'


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
  },
  DEFAULT_OPTIONS: {
    [PUBLIC_PATH]: process.cwd(),
    [FILE_NAME]: 'jest_html_reporters.html',
    [EXPAND]: false,
    [PAGE_TITLE]: 'Report',
    [LOGO_IMG_PATH]: undefined,
    [HIDE_ICON]: false,
    [CUSTOM_INFOS]: undefined,
    [TEST_COMMAND]: 'npx jest',
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

const getOptions = (reporterOptions = {}) =>
  Object.assign(
    {},
    constants.DEFAULT_OPTIONS,
    reporterOptions,
    getEnvOptions()
  )


module.exports = {
  getOptions,
  addAttach,
  addMsg,
  readAttachInfos,
  dataDirPath,
  attachDirPath,
  distDirName,
}
