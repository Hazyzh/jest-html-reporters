import React from 'react'
import { Row, Col, Card } from 'antd'
import { getFormatTime, getFormatData } from '@/untils'
import { BarChart, Bar, Brush, ReferenceLine,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    const { name } = payload[0].payload
    return (
      <Card style={{ width: 300 }}>
        <p className='label'>{`Time : ${payload[0].value}`}</p>
        <p className='intro'>{`${name}`}</p>
        <p className='desc'>Anything you want can be displayed here.</p>
      </Card>
    )
  }
  return null
}

const SimpleBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart data={getFormatData(data)}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 10' />
        <XAxis hide />
        <YAxis />
        <Tooltip
          content={<CustomTooltip />} />
        <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke='#000' />
        <Brush height={20} stroke='#8884d8' />
        <Bar dataKey='time' name='Time' fill='#0ebf8c' />
      </BarChart>
    </ResponsiveContainer>

  )
}

const Information = ({
  config: {
    rootDir,
    maxWorkers
  },
  startTime,
  endTime,
  testResults,
}) =>
  <Row>
    <Col span={18}>
      <SimpleBarChart data={testResults} />
      <Card>
        <p>MaxWorkers: {maxWorkers}</p>
        <p>Time: {getFormatTime(startTime, endTime)}</p>
        <p>RootDir: {rootDir}</p>
      </Card>
    </Col>
    <Col span={12}>
1
    </Col>
  </Row>

export default Information
