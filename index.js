const fs = require('fs')
const path = require('path')
const templatePath = path.resolve(__dirname, './dist/index.html')
const sourcePath = './node_modules/jest-html-reporters/dist'
const sourcePathReg = new RegExp(sourcePath, 'g')
const outPutSourcePath = path.resolve(__dirname, sourcePath)

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
      outPutPath = process.cwd(),
      outPutName = 'jest_html_reporters.html'
    } = this._options
    const filePath = path.resolve(outPutPath, outPutName)
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8')
    const outPutContext = htmlTemplate
      .replace(sourcePathReg, outPutSourcePath)
      .replace('$resultData', JSON.stringify(data))
    fs.writeFile(filePath, outPutContext, 'utf-8')
  }
}

module.exports = MyCustomReporter
