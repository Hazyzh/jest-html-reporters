import React from 'react';

import { Descriptions } from 'antd';

const createMarkup = (text) => ({
  __html: text
});

export default ({ customInfos }) => (
  <Descriptions bordered>
    {customInfos.map(({ title, value }) => (
      <Descriptions.Item key={title} label={title}><p dangerouslySetInnerHTML={createMarkup(value)} /></Descriptions.Item>
    ))}
  </Descriptions>
);
