import React from 'react';

import randomColor from 'randomcolor';
import type { IReportData } from '../interfaces/ReportData.interface';

import { Card, Col, Row, Typography, Space } from 'antd';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const { Text } = Typography;

import {
  formatDate,
  getFormatData,
  getFormattedTime,
  scrollTo,
} from '../utils/index';

import { TimeIcon } from '../utils/icons';

import {
  BoxPlotFilled,
  CheckOutlined,
  ClockCircleFilled,
  CloseOutlined,
  CompassFilled,
  FileOutlined,
  FolderFilled,
  InfoCircleOutlined,
  Loading3QuartersOutlined,
  PieChartFilled,
} from '@ant-design/icons';

import { ExpandContext } from '../contexts/expand';
import { ReactComponentElement, ReactElement } from 'react';

const colors = [...new Array(40)].map((d) => randomColor());
const createMarkup = (text: string) => ({
  __html: text,
});

const CustomTooltip = ({
  active,
  payload,
  label,
  rootDir,
  chartTooltip,
}: {
  active?: boolean;
  label?: string;
  rootDir?: string;
  chartTooltip?: boolean;
  payload?: any;
}) => {
  if (
    active &&
    Array.isArray(payload) &&
    !!payload[0] &&
    !!payload[0].payload
  ) {
    const {
      time,
      name,
      numFailingTests,
      numPassingTests,
      numPendingTests,
      testResults,
    } = payload[0].payload;
    const relativePath = name.replace(new RegExp('^' + rootDir), '');
    const lists = [
      { icon: <TimeIcon />, title: 'Time', content: `${time} S` },
      { icon: <FileOutlined />, title: 'Name', content: relativePath },
      {
        icon: <CheckOutlined style={{ color: 'green' }} />,
        title: 'Passed',
        content: numPassingTests,
      },
      {
        icon: <CloseOutlined style={{ color: '#ff4d4f' }} />,
        title: 'Failed',
        content: numFailingTests,
      },
      {
        icon: <Loading3QuartersOutlined style={{ color: '#faad14' }} />,
        title: 'Pending',
        content: numPendingTests,
      },
    ];
    if (chartTooltip) {
      return (
        <Card style={{ width: '100%' }}>
          {lists.map((item, i) => (
            <div className='tooltip_box' key={i}>
              <span className='icon'>{item.icon}</span>
              <span className='title'>{item.title} </span>
              <span className='symbol'>:</span>
              <span className='content'>{item.content}</span>
            </div>
          ))}
        </Card>
      );
    }
    return (
      <Card style={{ width: 700 }}>
        <Row gutter={12}>
          <Col span={16}>
            {lists.map((item, i) => (
              <div className='tooltip_box' key={i}>
                <span className='icon'>{item.icon}</span>
                <span className='title'>{item.title} </span>
                <span className='symbol'>:</span>
                <span className='content'>{item.content}</span>
              </div>
            ))}
          </Col>
          <Col span={8}>
            <p className='chart_title'>Duration Ratio</p>
            <ResponsiveContainer width='100%' height={100}>
              <PieChart>
                <Pie
                  data={testResults}
                  dataKey='duration'
                  cx='50%'
                  cy='50%'
                  outerRadius={50}
                  animationDuration={500}
                >
                  {testResults.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 40]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    );
  }
  return null;
};

export const SimpleBarChart = ({
  data,
  rootDir,
}: {
  data: IReportData['testResults'];
  rootDir: string;
}) => {
  return (
    <ExpandContext.Consumer>
      {({ toggleExpand }) => (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={getFormatData(data)}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 10' />
            <XAxis hide />
            <YAxis />
            <Tooltip content={<CustomTooltip rootDir={rootDir} />} />
            <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke='#000' />
            <Brush height={20} stroke='#8884d8' />
            <Bar
              dataKey='time'
              name='Suite Time'
              fill='#0ebf8c'
              onClick={({ name }) => {
                scrollTo(name, toggleExpand);
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ExpandContext.Consumer>
  );
};

const LabelInfo = ({
  title,
  icon,
  context,
}: {
  title: string;
  icon: ReactElement;
  context: string | number;
}) => (
  <div  className='label_box'>
    <Text className='label_title' type='secondary'>
      {icon} {title}
    </Text>
    <Text>
      <span dangerouslySetInnerHTML={createMarkup(`${context}`)}></span>
    </Text>
  </div>
);

export const Information = ({
  config: { rootDir, maxWorkers },
  startTime,
  endTime,
  testResults,
  _reporterOptions: { customInfos = [] },
}: IReportData) => (
  <ExpandContext.Consumer>
    {({ toggleExpand }) => (
      <Row>
        <Col span={18}>
          <SimpleBarChart data={testResults} rootDir={rootDir} />
        </Col>
        <Col span={6}>
          <p className='chart_title'>
            <PieChartFilled style={{ marginRight: '5px' }} />
            Timing Ratio
          </p>
          <ResponsiveContainer
            className='chart_content_box'
            width='100%'
            height={300}
          >
            <PieChart>
              <Pie
                data={getFormatData(testResults)}
                dataKey='time'
                cx='50%'
                cy='50%'
                outerRadius='90%'
                onClick={({ name }) => {
                  scrollTo(name, toggleExpand);
                }}
                animationDuration={500}
              >
                {testResults.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 40]} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip rootDir={rootDir} chartTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col span={24} className='main_information'>
          <Card>
            <Row>
              <Col span={16}>
                <LabelInfo
                  title='StartTime'
                  context={formatDate(startTime)}
                  icon={<BoxPlotFilled />}
                />
                <LabelInfo
                  title='Time'
                  context={getFormattedTime(startTime, endTime)}
                  icon={<ClockCircleFilled />}
                />
                <LabelInfo
                  title='RootDir'
                  context={rootDir}
                  icon={<FolderFilled />}
                />
              </Col>
              <Col span={8}>
                <LabelInfo
                  title='MaxWorkers'
                  context={maxWorkers}
                  icon={<CompassFilled />}
                />
              </Col>
              {customInfos &&
                customInfos.map(({ title, value }) => (
                  <Col span={8} key={title}>
                    <LabelInfo
                      title={title}
                      context={value}
                      icon={<InfoCircleOutlined />}
                    />
                  </Col>
                ))}
            </Row>
          </Card>
        </Col>
      </Row>
    )}
  </ExpandContext.Consumer>
);
