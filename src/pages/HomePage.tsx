import React, { useState, useEffect } from 'react';
import { Layout, FloatButton, Row, Col, Switch, Typography, theme } from 'antd';

import {
  AppstoreOutlined,
  PercentageOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import type { IReportData } from '../interfaces/ReportData.interface';

import { getExecutionResult } from '../utils/index';
import { DashBoard, Information, MainTable } from '../components';
import { addThemeClass } from '../lib/addThemeClass';

const { Content } = Layout;
const { Title } = Typography;

export const HomePage = ({ data }: { data: IReportData }) => {
  const [globalExpandState, setGlobalExpandState] = useState(
    data._reporterOptions.expand || false
  );
  const [usingExecutionTime, setUsingExecutionTime] = useState(false);
  const { config } = data;
  const {
    token,
    theme: { id },
  } = theme.useToken();
  useEffect(() => {
    addThemeClass(token, id);
  }, [id]);
  const comProps = {
    ...data,
    testResults: usingExecutionTime
      ? getExecutionResult(data.testResults)
      : data.testResults,
    globalExpandState,
  };

  return (
    <Content style={{ padding: '0 50px' }}>
      <FloatButton.BackTop />
      <Row justify='space-between' align='bottom'>
        <Col>
          <Title level={3}>
            <AppstoreOutlined /> Dashboard
          </Title>
        </Col>
        {config.coverageLinkPath && (
          <Col>
            <h3>
              <a
                href={`${config.coverageLinkPath}`}
                data-testid='coverage-link'
              >
                <PercentageOutlined /> Coverage
              </a>
            </h3>
          </Col>
        )}
      </Row>
      <DashBoard {...comProps} />
      <Title level={3}>
        <PieChartOutlined /> Information
      </Title>
      <Information {...comProps} />
      <Title level={3} className='expand_box'>
        <span>
          <ProfileOutlined /> Details
        </span>
        <span className='expand_title'>
          <span className='text'>Show Execution Time</span>
          <Switch
            onChange={(checked) => setUsingExecutionTime(checked)}
            checked={usingExecutionTime}
          />{' '}
          <span className='text'>Expand All</span>
          <Switch
            onChange={(checked) => setGlobalExpandState(checked)}
            checked={globalExpandState}
          />
        </span>
      </Title>
      <MainTable {...comProps} />
    </Content>
  );
};
