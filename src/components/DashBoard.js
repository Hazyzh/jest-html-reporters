import React from 'react'
import { Row, Col, Card } from 'antd'
import { getPercentage } from '@/untils'
const MyCardItem = ({
  labelColor,
  label,
  title,
  content
}) => <Card
  bodyStyle={{ padding: '12px' }}
  hoverable>
  <p className='card_item_label' style={{ color: labelColor }}>
    {label}
  </p>
  <p className='card_item_title' style={{ color: labelColor }}>{title}</p>
  <p className='card_item_content'>{content}</p>
</Card>

const DashBoard = ({
  numTotalTests,
  numTotalTestSuites,
  numFailedTestSuites,
  numFailedTests,
  numPendingTestSuites,
  numPendingTests,
  numRuntimeErrorTestSuites,
}) => {
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
    labelColor: '#cf1322'
  }
  const FailedTests = {
    title: numFailedTests,
    content: 'Failed Tests',
    label: `${getPercentage(numFailedTests, numTotalTests)} %`,
    labelColor: '#cf1322'
  }
  const PendingTestSuites = {
    title: numPendingTestSuites,
    content: 'Pending Suites',
    label: `${getPercentage(numPendingTestSuites, numTotalTests)} %`,
    labelColor: '#faad14'
  }
  const PendingTests = {
    title: numPendingTests,
    content: 'Pending Tests',
    label: `${getPercentage(numPendingTests, numTotalTests)} %`,
    labelColor: '#faad14'
  }
  const cardsList = [TotalTestSuites, TotalTests, FailedTestSuites, FailedTests, PendingTestSuites, PendingTests]
  if (numRuntimeErrorTestSuites) {
    const RuntimeErrorTestSuites = {
      title: numRuntimeErrorTestSuites,
      content: 'Runtime Error Suites',
      label: `${getPercentage(numRuntimeErrorTestSuites, numTotalTestSuites)} %`,
      labelColor: '#cf1322'
    }
    cardsList.push(RuntimeErrorTestSuites)
  }
  const length = cardsList.length
  const gutter = (24 % length) ? 0 : 12
  return <div className='dash_board'>
    <Row
      gutter={gutter}
      type='flex'
      justify='space-around'>
      {
        cardsList.map(item =>
          <Col key={item.content} span={Math.floor(24 / length)}>
            <MyCardItem
              {...item} />
          </Col>
        )
      }
    </Row>
  </div>
}

export default DashBoard
