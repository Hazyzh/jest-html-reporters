import React from 'react';

import { Card, Col, Row, theme, Typography } from 'antd';
import type { IReportData } from '../interfaces/ReportData.interface';

import { getPercentage, scrollTo } from '../utils/index';
import type { IExpandContext } from '../interfaces/Context.interface';
import type { ICardsListItem } from '../interfaces/DashBoard.interface';
import { ExpandContext } from '../contexts/expand';
const { Text } = Typography;

export const MyCardItem = ({
  labelColor,
  label,
  title,
  content,
  clickHandler,
}: any) => (
  <Card onClick={clickHandler} bodyStyle={{ padding: '12px' }} hoverable>
    <p className='card_item_label' style={{ color: labelColor }}>
      {label}
    </p>
    <p className='card_item_title' style={{ color: labelColor }}>
      {title}
    </p>
    <p className='card_item_content'>
      <Text type='secondary' italic>{content}</Text>
    </p>
  </Card>
);

const getScrollDownFunc =
  (test: any) => (toggleExpand: IExpandContext['toggleExpand']) => () =>
    test && scrollTo(test.testFilePath, toggleExpand);

export const DashBoard = ({
  numTotalTests,
  numTotalTestSuites,
  numFailedTestSuites,
  numFailedTests,
  numPendingTestSuites,
  numPendingTests,
  numTodoTests,
  numRuntimeErrorTestSuites,
  testResults,
}: IReportData) => {
  const { token } = theme.useToken();
  const { colorError, colorWarning, colorPrimary } = token;

  const failedTest = testResults.find(({ numFailingTests }) => numFailingTests);
  const pendingTest = testResults.find(
    ({ numPendingTests }) => numPendingTests
  );
  const todoTest = testResults.find(({ numTodoTests }) => numTodoTests);
  const execErrorTest = testResults.find(({ testExecError }) => testExecError);

  const TotalTestSuites = {
    title: numTotalTestSuites,
    content: 'Test Suites Total',
    labelColor: colorPrimary,
  };
  const TotalTests = {
    title: numTotalTests,
    content: 'Tests Total',
    labelColor: colorPrimary,
  };
  const FailedTestSuites = {
    title: numFailedTestSuites,
    content: 'Failed Suites',
    label: `${getPercentage(numFailedTestSuites, numTotalTestSuites)} %`,
    labelColor: colorError,
    clickHandler: getScrollDownFunc(failedTest),
  };
  const FailedTests = {
    title: numFailedTests,
    content: 'Failed Tests',
    label: `${getPercentage(numFailedTests, numTotalTests)} %`,
    labelColor: colorError,
    clickHandler: getScrollDownFunc(failedTest),
  };
  const PendingTestSuites = {
    title: numPendingTestSuites,
    content: 'Pending Suites',
    label: `${getPercentage(numPendingTestSuites, numTotalTestSuites)} %`,
    labelColor: colorWarning,
    clickHandler: getScrollDownFunc(pendingTest),
  };
  const PendingTests = {
    title: numPendingTests,
    content: 'Pending Tests',
    label: `${getPercentage(numPendingTests, numTotalTests)} %`,
    labelColor: colorWarning,
    clickHandler: getScrollDownFunc(pendingTest),
  };
  // TODO: using token for label color to support dark mode.
  const cardsList: ICardsListItem[] = [
    TotalTestSuites,
    TotalTests,
    FailedTestSuites,
    FailedTests,
    PendingTestSuites,
    PendingTests,
  ];
  if (numTodoTests) {
    const TodoTests = {
      title: numTodoTests,
      content: 'Todo Tests',
      label: `${getPercentage(numTodoTests, numTotalTests)} %`,
      labelColor: '#d466d6',
      clickHandler: getScrollDownFunc(todoTest),
    };
    cardsList.push(TodoTests);
  }
  if (numRuntimeErrorTestSuites) {
    const RuntimeErrorTestSuites = {
      title: numRuntimeErrorTestSuites,
      content: 'Runtime Error Suites',
      label: `${getPercentage(
        numRuntimeErrorTestSuites,
        numTotalTestSuites
      )} %`,
      labelColor: colorError,
      clickHandler: getScrollDownFunc(execErrorTest),
    };
    cardsList.push(RuntimeErrorTestSuites);
  }
  const length = cardsList.length;
  const gutter = 24 % length ? 0 : 12;
  return (
    <ExpandContext.Consumer>
      {({ toggleExpand }) => (
        <div className='dash_board'>
          <Row gutter={gutter} justify='space-around'>
            {cardsList.map((item) => (
              <Col key={item.content} span={Math.floor(24 / length)}>
                <MyCardItem
                  {...item}
                  clickHandler={item.clickHandler?.(toggleExpand)}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </ExpandContext.Consumer>
  );
};
