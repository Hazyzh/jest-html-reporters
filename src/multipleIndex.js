import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import App from "./MultipleReportApp";
const resultDataFileName = "./jest-html-reports-unite-data.json";

(async () => {
  let data;
  if (process.env.NODE_ENV === "production") {
    data = await fetch(resultDataFileName).then((response) => response.json());
    window.realData = data;
  } else {
    data = require("./devMultipleMock.json");
  }

  ReactDOM.render(<App data={data} />, document.getElementById("app"));
})();
