import React from "react";
import { Descriptions } from "antd";

export default ({ customInfos }) => (
  <Descriptions bordered>
    {customInfos.map(({ title, value }) => (
      <Descriptions.Item label={title}>{value}</Descriptions.Item>
    ))}
  </Descriptions>
);
