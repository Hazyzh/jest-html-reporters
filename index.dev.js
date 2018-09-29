const fs = require('fs')
// my-custom-reporter.js
const OUT_PUT = './src/testdata.1.json'
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(contexts, results) {
    results.config = this._globalConfig
    // console.log('Options: ', this._options);
    results.endTime = Date.now()
    const data = JSON.stringify(results)
    fs.writeFileSync(OUT_PUT, data, 'utf-8')
  }
}

module.exports = MyCustomReporter
