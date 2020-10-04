import React from 'react'
import { hot } from 'react-hot-loader'
import App from './components/app'

let data
if (process.env.NODE_ENV === 'production') {
  const resData = document.getElementById('resData').innerText
  data = JSON.parse(JSON.parse(resData))
} else {
  data = require('./devMock.json')
}
const defaultTitle = 'Report'
window.realData = data
document.title = data._reporterOptions.pageTitle || defaultTitle

const SingleReportApp = () => <App data={data} />

export default hot(module)(SingleReportApp)
