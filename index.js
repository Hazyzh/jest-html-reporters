const fs = require('fs')
const path = require('path')
const localTemplatePath = path.resolve(__dirname, './dist/index.html')

function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath))
  }
  fs.mkdirSync(dirpath)
}

function imgToBase64(imgPath) {
  const fileName = path.resolve(imgPath)
  if (fs.statSync(fileName).isFile()) {
    const fileData = fs.readFileSync(fileName).toString('base64')
    return `data:image/${fileName.split('.').pop()};base64,${fileData}`
  }
  return undefined
}

// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(contexts, results) {
    const {
      publicPath = process.cwd(),
      filename = 'jest_html_reporters.html',
      logoImgPath,
    } = this._options
    const logoImg = logoImgPath ? imgToBase64(logoImgPath) : undefined
    results.config = this._globalConfig
    results.endTime = Date.now()
    results._reporterOptions = { ...this._options, logoImg }
    const data = JSON.stringify(results)

    fs.existsSync(publicPath) === false && publicPath && mkdirs(publicPath)
    const filePath = path.resolve(publicPath, filename)
    // fs.writeFileSync('./src/devMock.json', data)
    const htmlTemplate = fs.readFileSync(localTemplatePath, 'utf-8')
    const outPutContext = htmlTemplate
      .replace('$resultData', JSON.stringify(data))
    fs.writeFileSync(filePath, outPutContext, 'utf-8')
    console.log('📦 reporter is created on:', filePath)
  }
}

module.exports = MyCustomReporter
