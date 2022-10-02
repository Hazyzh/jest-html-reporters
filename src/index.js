import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './SingleReportApp';
import { fetchWithJsonp } from './untils/index';

(async () => {
  let data;
  if (process.env.NODE_ENV === 'production') {
    const singleDataEle = document.getElementById('jest-html-reports-result-data');
    if (singleDataEle) {
      const resData = singleDataEle.innerText;
      data = JSON.parse(resData);
    } else {
      const pathPlaceholder = process.env.PLACEHOLDER;
      data = await fetchWithJsonp(`./${pathPlaceholder}/result.js`);
    }
  } else {
    data = require('./devMock.json');
  }
  const defaultTitle = 'Report';
  window.realData = data;
  document.title = data._reporterOptions.pageTitle || defaultTitle;

  const root = createRoot(document.getElementById('app')); 
  root.render(<App data={data} />);
})();
