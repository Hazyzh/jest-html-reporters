import React from "react";
import { hot } from "react-hot-loader";
import App from "./components/multipleApp";

const formatData = (dataList) => {
  const res = dataList.map((item) => {
    const {
      numFailedTestSuites,
      numRuntimeErrorTestSuites,
      _reporterOptions: { pageTitle },
      config: { rootDir },
    } = item;

    const packageName = rootDir.split("/").splice(-1)[0];

    return {
      name: pageTitle || packageName,
      isPassed: !numFailedTestSuites && !numRuntimeErrorTestSuites,
      data: item,
    };
  });

  return res;
};

const MultipleReportApp = ({ data }) => <App dataList={formatData(data)} />;

export default hot(module)(MultipleReportApp);
