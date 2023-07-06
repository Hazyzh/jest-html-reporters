
import { createRoot } from 'react-dom/client';

import App from './App';
import { fetchWithJsonp } from './utils/index';
import pathPlaceholder from '../config/packageReplaceString'

(async () => {
  let data;
  if (process.env.NODE_ENV === 'production') {
    const singleDataEle = document.getElementById('jest-html-reports-result-data');
    if (singleDataEle) {
      const resData = singleDataEle.innerText;
      data = JSON.parse(resData);
    } else {
      data = await fetchWithJsonp(`./${pathPlaceholder}/result.js`);
    }
  } else {
    data = require('./devMock.json');
  }
  const defaultTitle = 'Report';
  window.realData = data;
  document.title = data._reporterOptions.pageTitle || defaultTitle;
  document.head.insertAdjacentHTML("beforeend", `<style>td.ant-table-column-sort {background: transparent !important}</style>`)

  const root = createRoot(document.getElementById('app') as HTMLDivElement); 
  root.render(<App data={data} />);
})();
