const fs = require('fs')
let a = 1
// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
    // console.log(...arguments)
  }

  onTestStart(Test) {
    // console.log('')
    a++
  }

  onTestResult(Test, testResult, aggregatedResult) {
    // a === 1 && console.log(aggregatedResult)
    // a++
  }

  getLastError() {
    if (this._shouldFail) {
      return new Error('my-custom-reporter.js reported an error')
    }
  }

  onRunComplete(contexts, results) {
    // console.log(contexts)
    // console.log(this._globalConfig)
    // console.log('@@___@@');
    // console.log('Custom reporter output:', results.testResults[0].testResults[1].failureMessages[0]);
    console.log('GlobalConfig: ', this._globalConfig)
    results.config = this._globalConfig
    // console.log('Options: ', this._options);
    results.endTime = Date.now()
    const data = JSON.stringify(results)
    fs.writeFile('./src/testdata.1.json', data, (err) => {
      console.log(err)
    })
  }
}

module.exports = MyCustomReporter
