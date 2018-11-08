const fs = require('fs')
const path = require('path')
const localTemplatePath = path.resolve(__dirname, './dist/index_local_tmp.html')
const serverTemplatePath = path.resolve(__dirname, './dist/index_server_tmp.html')

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
      outPutPath,
      outPutName = 'jest_html_reporters.html'
    } = this._options
    const tmp = !outPutPath ? localTemplatePath : serverTemplatePath
    const filePath = path.resolve(outPutPath || path.cwd(), outPutName)
    const htmlTemplate = fs.readFileSync(tmp, 'utf-8')
    const outPutContext = htmlTemplate
      .replace('$resultData', JSON.stringify(data))
    fs.writeFile(filePath, outPutContext, 'utf-8')
  }
}

module.exports = MyCustomReporter
