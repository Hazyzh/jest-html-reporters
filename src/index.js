import React from 'react';
import ReactDOM from 'react-dom';

import App from './SingleReportApp';
import { fetchWithJsonp } from './untils/index';

(async () => {
  let data;
  if (process.env.NODE_ENV === 'production') {
    // data = require('./jest-html-reporters-attach/result.json');
    const pathPlaceholder = process.env.PLACEHOLDER;
    data = await fetchWithJsonp(`./${pathPlaceholder}/result.js`);
  } else {
    data = require('./devMock.json');
  }
  const defaultTitle = 'Report';
  window.realData = data;
  document.title = data._reporterOptions.pageTitle || defaultTitle;

  ReactDOM.render(
    <App data={data} />,
    document.getElementById('app')
  );
})();
