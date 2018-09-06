const fs = require('fs')
// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
    console.log(...arguments)
  }

  onTestStart(test) {
  }

  onRunComplete(contexts, results) {
    console.log(contexts)
    console.log(this._globalConfig)
    // console.log('@@___@@');
    // console.log('Custom reporter output:', results.testResults[0].testResults[1].failureMessages[0]);
    // // console.log('GlobalConfig: ', this._globalConfig);
    // console.log('Options: ', this._options);
    const data = JSON.stringify(results)
    fs.writeFile('./src/testdata.1.json', data, (err) => {
      console.log(err)
    })
  }
}

module.exports = MyCustomReporter
