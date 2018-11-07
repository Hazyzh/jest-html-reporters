const fs = require('fs')
// my-custom-reporter.js
const path = require('path')
const TMP = path.resolve(__dirname, './dist/index.html')
const sourcePath = './node_modules/jest-html-reporters/dist'
const sourcePathReg = new RegExp(sourcePath, 'g')
const devPath = './dist'
const outPutSourcePath = path.resolve(__dirname, devPath)

// my-custom-reporter.js
// const OUT_PUT_JSON = './src/testdata.1.json'
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(contexts, results) {
    const {
      outPutPath = process.cwd(),
      outPutName = 'jest_html_reporters.html'
    } = this._options
    const filePath = path.resolve(outPutPath, outPutName)
    results.config = this._globalConfig
    results.endTime = Date.now()
    const data = JSON.stringify(results)
    const htmlTemplate = fs.readFileSync(TMP, 'utf-8')
    const outPutContext = htmlTemplate
      .replace(sourcePathReg, outPutSourcePath)
      .replace('$resultData', JSON.stringify(data))
    fs.writeFile(filePath, outPutContext, 'utf-8')
    // fs.writeFileSync(OUT_PUT_JSON, data, 'utf-8')
  }
}

module.exports = MyCustomReporter
