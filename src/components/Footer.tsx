import React from 'react';
import { Divider, Row, Layout, Space } from 'antd';

const Github = 'https://github.com/Hazyzh/jest-html-reporters';
const Issues = 'https://github.com/Hazyzh/jest-html-reporters/issues';

const versions = process.env.VERSIONS || '1.0.0';

export const Footer = () => (
  <Layout.Footer>
    <Row justify='center'>
      <Space size='large'>
        <a href={Github}>About</a>
        <Divider type='vertical' />
        <a href={Issues}>Feedback</a>
      </Space>
      <Divider />
      <p>Versions _ {versions}</p>
    </Row>
  </Layout.Footer>
);
