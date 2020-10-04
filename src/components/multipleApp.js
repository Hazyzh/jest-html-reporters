import React, { Component, useState } from "react";
import { FrownTwoTone, SmileTwoTone, GoldOutlined } from "@ant-design/icons";
import App from "./app";
import "../styles/multipleApp.less";

class MultipleApp extends Component {
  state = {
    activeReport: 0,
    show: true,
  };

  setActiveReport = (index) => {
    this.setState({ activeReport: index });
    this.setState({ show: false }, () => {
      this.setState({ show: true });
    });
  };

  render() {
    const { dataList } = this.props;
    const { activeReport, show } = this.state;
    return (
      <>
        <h3 className="multiple_subject">Project List</h3>
        <div className="multiple_tag_box">
          {dataList.map((item, index) => (
            <div
              key={index}
              onClick={() => this.setActiveReport(index)}
              className={activeReport === index ? "tag_checked" : ""}
            >
              <span className={item.isPassed ? "" : "text-red"}>
                {item.name}
              </span>{" "}
              {item.isPassed ? (
                <SmileTwoTone twoToneColor="#52c41a" />
              ) : (
                <FrownTwoTone twoToneColor="#cf1321" />
              )}
            </div>
          ))}
        </div>
        <div className="multiple_box">
          {show && <App data={dataList[activeReport].data} />}
        </div>
      </>
    );
  }
}

export default MultipleApp;
