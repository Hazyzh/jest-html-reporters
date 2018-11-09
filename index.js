const fs = require('fs')
const path = require('path')
const localTemplatePath = path.resolve(__dirname, './dist/index.html')

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
    const filePath = path.resolve(publicPath, filename)
    const htmlTemplate = fs.readFileSync(localTemplatePath, 'utf-8')
    const outPutContext = htmlTemplate
      .replace('$resultData', JSON.stringify(data))
    fs.writeFileSync(filePath, outPutContext, 'utf-8')
    console.log('📦 reporter is created on:', filePath)
  }
}

module.exports = MyCustomReporter
