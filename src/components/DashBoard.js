import React from 'react'
import { Row, Col, Card } from 'antd'

const MyCardItem = ({
  labelColor,
  label,
  title,
  content
}) => <Card
  hoverable>
  <p className='card_item_label'>
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
    content: 'Failed Suites Total',
    label: `${(Math.floor((numFailedTestSuites / numTotalTestSuites) * 100))} %`,
    labelColor: '#cf1322'
  }
  const FailedTests = {
    title: numFailedTests,
    content: 'Failed Tests Total',
    label: `${(Math.floor((numFailedTests / numTotalTests) * 100))} %`,
    labelColor: '#cf1322'
  }
  const PendingTestSuites = {
    title: numPendingTestSuites,
    content: 'Pending Suites Total',
    label: `${(Math.floor((numPendingTestSuites / numTotalTests) * 100))} %`,
    labelColor: '#faad14'
  }
  const PendingTests = {
    title: numPendingTests,
    content: 'Pending Tests Total',
    label: `${(Math.floor((numPendingTests / numTotalTests) * 100))} %`,
    labelColor: '#faad14'
  }
  const cardsList = [TotalTestSuites, TotalTests, FailedTestSuites, FailedTests, PendingTestSuites, PendingTests]
  return <div className='dash_board'>
    <Row gutter={24}>
      {
        cardsList.map(item =>
          <Col key={item.content} span={4}>
            <MyCardItem
              {...item} />
          </Col>
        )
      }
    </Row>
  </div>
}

export default DashBoard
