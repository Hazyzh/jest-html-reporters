import React from 'react'
import { Row, Col, Card } from 'antd'
import { getFormatTime } from '@/untils'

const Information = ({
  config: {
    rootDir,
    maxWorkers
  },
  startTime,
  endTime
}) =>
  <Row>
    <Col span={12}>
      <Card>
        <p>rootDir: {rootDir}</p>
        <p>maxWorkers: {maxWorkers}</p>
        <p>time: {getFormatTime(startTime, endTime)}</p>
      </Card>
    </Col>
  </Row>

export default Information
