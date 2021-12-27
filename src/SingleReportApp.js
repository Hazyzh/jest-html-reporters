import React from 'react';

import { hot } from 'react-hot-loader';

import App from './components/app';

const SingleReportApp = ({ data }) => <App data={data} />;

export default hot(module)(SingleReportApp);
