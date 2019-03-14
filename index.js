const fs = require('fs')
const path = require('path')
const localTemplatePath = path.resolve(__dirname, './dist/index.html')

function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}

// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(contexts, results) {
    results.config = this._globalConfig
    results.endTime = Date.now()
    const data = JSON.stringify(results)

    const {
      publicPath = process.cwd(),
      filename = 'jest_html_reporters.html'
    } = this._options
    fs.existsSync(publicPath) === false && mkdirs(publicPath)
    const filePath = path.resolve(publicPath, filename)
    const htmlTemplate = fs.readFileSync(localTemplatePath, 'utf-8')
    const outPutContext = htmlTemplate
      .replace('$resultData', JSON.stringify(data))
    fs.writeFileSync(filePath, outPutContext, 'utf-8')
    console.log('📦 reporter is created on:', filePath)
  }
}

module.exports = MyCustomReporter
