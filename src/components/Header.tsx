import React from 'react';
import { Avatar, Layout, Button, Row, Col, Space, Switch } from 'antd';
import { GithubFilled, SlackOutlined, SkinTwoTone } from '@ant-design/icons';
import type { IReportData } from '../interfaces/ReportData.interface';

import DarkMode from '../assets/imgs/darkMode.svg';
import LightMode from '../assets/imgs/lightMode.svg';
import Icon from '@ant-design/icons';

const defaultTitle = 'Report';

export const Header = ({
  data,
  darkTheme,
  toggleDarkTheme,
}: {
  data: IReportData;
  darkTheme: boolean;
  toggleDarkTheme: (on: boolean) => void;
}) => {
  const { hideIcon, pageTitle = defaultTitle } = data._reporterOptions;
  const { logoImg } = data._reporterOptions;
  const IconComp = hideIcon ? null : (
    <Button
      type='link'
      target='_blank'
      size='large'
      href='https://github.com/Hazyzh/jest-html-reporters'
      icon={<GithubFilled />}
    />
  );

  if (!(logoImg || pageTitle || IconComp)) return null;

  return (
    <Layout.Header>
      <Row justify='space-between'>
        <Col span={4} style={{ textAlign: 'left' }}>
          {logoImg && <Avatar src={logoImg} shape='square' size='large' />}
        </Col>
        <Col span={16} style={{ textAlign: 'center' }}>
          {pageTitle}
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Space size='large'>
            <Switch
              className="them-switch"
              checked={darkTheme}
              onChange={toggleDarkTheme}
              checkedChildren={<Icon component={LightMode} />}
              unCheckedChildren={<Icon color={'red'} component={DarkMode} />}
            />
            {IconComp}
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
};
