import React from 'react'
import { Row, Col, Card, Icon } from 'antd'
import { getFormatTime, getFormatData } from '@/untils'
import { BarChart, Bar, Brush, ReferenceLine,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { TimeIcon } from '@/untils/icons'

const CustomTooltip = ({ active, payload, label, rootDir }) => {
  if (active) {
    const { time, name, numFailingTests, numPassingTests, numPendingTests, } = payload[0].payload
    const relativePath = name.replace(new RegExp('^' + rootDir), '')
    const lists = [
      { icon: <TimeIcon />, title: 'Time', content: `${time} S` },
      { icon: <Icon type='file' theme='outlined' />, title: 'Name', content: relativePath },
      { icon: <Icon type='check' theme='outlined' style={{ color: 'green' }} />, title: 'Passed', content: numPassingTests },
      { icon: <Icon type='close' theme='outlined' style={{ color: '#ff4d4f' }} />, title: 'Failed', content: numFailingTests },
      { icon: <Icon type='loading-3-quarters' theme='outlined' style={{ color: '#faad14' }} />, title: 'Pending', content: numPendingTests },
    ]

    return (
      <Card style={{ width: 700 }}>
        <Row gutter={12}>
          <Col span={16}>
            {
              lists.map((item, i) => (
                <div className='tooltip_box' key={i}>
                  <span className='icon'>{item.icon}</span>
                  <span className='title'>{item.title} </span>
                  <span className='symbol'>:</span>
                  <span className='content'>{item.content}</span>
                </div>
              ))
            }
          </Col>
          <Col span={8}>
            1
          </Col>
        </Row>

      </Card>
    )
  }
  return null
}

const SimpleBarChart = ({ data, rootDir }) => {
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart data={getFormatData(data)}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 10' />
        <XAxis hide />
        <YAxis />
        <Tooltip
          content={<CustomTooltip rootDir={rootDir} />} />
        <Legend verticalAlign='top' wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke='#000' />
        <Brush height={20} stroke='#8884d8' />
        <Bar
          dataKey='time'
          name='Time'
          fill='#0ebf8c'
          onClick={({ name }) => { window.location.hash = '#' + name }} />
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
      <SimpleBarChart data={testResults} rootDir={rootDir} />
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
