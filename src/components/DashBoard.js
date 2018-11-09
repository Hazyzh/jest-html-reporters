import React from 'react'
import { Row, Col, Card } from 'antd'
import { getPercentage, scrollTo } from '@/untils'
import { Consumer } from '../contexts/expand'

const MyCardItem = ({
  labelColor,
  label,
  title,
  content,
  clickHander,
}) => <Card
  onClick={clickHander}
  bodyStyle={{ padding: '12px' }}
  hoverable>
  <p className='card_item_label' style={{ color: labelColor }}>
    {label}
  </p>
  <p className='card_item_title' style={{ color: labelColor }}>{title}</p>
  <p className='card_item_content'>{content}</p>
</Card>
// todo: Refactor with react hooks(need update to React 16.6)
const getScrollDownFunc = test => toggleExpand => () => test && scrollTo(test.testFilePath, toggleExpand)

const DashBoard = ({
  numTotalTests,
  numTotalTestSuites,
  numFailedTestSuites,
  numFailedTests,
  numPendingTestSuites,
  numPendingTests,
  numRuntimeErrorTestSuites,
  testResults,
}) => {
  const failedTest = testResults.find(({ numFailingTests }) => numFailingTests)
  const pendingTest = testResults.find(({ numPendingTests }) => numPendingTests)
  const execErrorTest = testResults.find(({ testExecError }) => testExecError)

  const TotalTestSuites = {
    title: numTotalTestSuites,
    content: 'Test Suites Total'
  }
  const TotalTests = {
    title: numTotalTests,
    content: 'Tests Total'
  }
  const FailedTestSuites = {
    title: numFailedTestSuites,
    content: 'Failed Suites',
    label: `${getPercentage(numFailedTestSuites, numTotalTestSuites)} %`,
    labelColor: '#cf1322',
    clickHander: getScrollDownFunc(failedTest),
  }
  const FailedTests = {
    title: numFailedTests,
    content: 'Failed Tests',
    label: `${getPercentage(numFailedTests, numTotalTests)} %`,
    labelColor: '#cf1322',
    clickHander: getScrollDownFunc(failedTest),
  }
  const PendingTestSuites = {
    title: numPendingTestSuites,
    content: 'Pending Suites',
    label: `${getPercentage(numPendingTestSuites, numTotalTests)} %`,
    labelColor: '#faad14',
    clickHander: getScrollDownFunc(pendingTest),
  }
  const PendingTests = {
    title: numPendingTests,
    content: 'Pending Tests',
    label: `${getPercentage(numPendingTests, numTotalTests)} %`,
    labelColor: '#faad14',
    clickHander: getScrollDownFunc(pendingTest),
  }
  const cardsList = [TotalTestSuites, TotalTests, FailedTestSuites, FailedTests, PendingTestSuites, PendingTests]
  if (numRuntimeErrorTestSuites) {
    const RuntimeErrorTestSuites = {
      title: numRuntimeErrorTestSuites,
      content: 'Runtime Error Suites',
      label: `${getPercentage(numRuntimeErrorTestSuites, numTotalTestSuites)} %`,
      labelColor: '#cf1322',
      clickHander: getScrollDownFunc(execErrorTest),
    }
    cardsList.push(RuntimeErrorTestSuites)
  }
  const length = cardsList.length
  const gutter = (24 % length) ? 0 : 12
  return <Consumer>
    {
      ({ toggleExpand }) => (
        <div className='dash_board'>
          <Row
            gutter={gutter}
            type='flex'
            justify='space-around'>
            {
              cardsList.map(item =>
                <Col key={item.content} span={Math.floor(24 / length)}>
                  <MyCardItem
                    {...item}
                    clickHander={item.clickHander && item.clickHander(toggleExpand)} />
                </Col>
              )
            }
          </Row>
        </div>
      )
    }

  </Consumer>
}

export default DashBoard
