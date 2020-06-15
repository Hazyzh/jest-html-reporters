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
    console.log(attachFiles, outPutDir)
    if (attachFiles.length) await fs.copy(attachDirPath, outPutDir)

    dataList.forEach(attachObject => {
      if (!attachObject) return

      const { testPath, testName, filePath, description, fileName } = attachObject
      if (!result[testPath]) result[testPath] = {}
      if (!result[testPath][testName]) result[testPath][testName] = []

      result[testPath][testName].push({
        filePath: fileName ? path.resolve(outPutDir, fileName) : filePath,
        description,
      })
    })
  } catch (err) {
    console.error(err)
    console.error(`[jest-html-reporters]: parse attach failed!`)
  }

  return result
}

module.exports = {
  addAttach,
  readAttachInfos,
  dataDirPath,
  attachDirPath,
  distDirName,
}
