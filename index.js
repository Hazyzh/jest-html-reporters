const fs = require('fs')
// my-custom-reporter.js
const path = require('path')
const TMP = path.resolve(__dirname, './dist/index.html')
const OUT_PUT = path.resolve(process.cwd(), 'jest_html_reporters.html')
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(contexts, results) {
    results.config = this._globalConfig
    results.endTime = Date.now()
    const data = JSON.stringify(results)
    const index = fs.readFileSync(TMP, 'utf-8')
    fs.writeFile(OUT_PUT, index.replace('$resultData', JSON.stringify(data)), 'utf-8')
  }
}

module.exports = MyCustomReporter
