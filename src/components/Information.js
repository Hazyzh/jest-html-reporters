import React from 'react'
import { Row, Col, Card, Icon } from 'antd'
import randomColor from 'randomcolor'
import { getFormatTime, getFormatData, scrollTo } from '@/untils'
import { BarChart, Bar, Brush, ReferenceLine,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart,
  Pie, Cell,
} from 'recharts'
import { TimeIcon } from '@/untils/icons'
import { Consumer } from '../contexts/expand'

const colors = [...new Array(40)].map(d => randomColor())

const CustomTooltip = ({ active, payload, label, rootDir }) => {
  if (active) {
    const { time, name, numFailingTests, numPassingTests, numPendingTests, testResults } = payload[0].payload
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
            <p className='chart_title'>
              Duration Ratio
            </p>
            <ResponsiveContainer width={'100%'} height={100}>
              <PieChart>
                <Pie
                  data={testResults}
                  dataKey='duration'
                  cx='50%'
                  cy='50%'
                  outerRadius={50}
                  animationDuration={500} >
                  {
                    testResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 40]} />
                    ))
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    )
  }
  return null
}

const SimpleBarChart = ({ data, rootDir }) => {
  return (
    <Consumer>
      {
        ({ toggleExpand }) => (
          <ResponsiveContainer width={'100%'} height={300}>
            <BarChart data={getFormatData(data)}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray='3 10' />
              <XAxis hide />
              <YAxis />
              <Tooltip
                content={<CustomTooltip rootDir={rootDir} />} />
              <Legend
                verticalAlign='top'
                wrapperStyle={{ lineHeight: '40px' }} />
              <ReferenceLine y={0} stroke='#000' />
              <Brush height={20} stroke='#8884d8' />
              <Bar
                dataKey='time'
                name='Time'
                fill='#0ebf8c'
                onClick={({ name }) => { scrollTo(name, toggleExpand) }} />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    </Consumer>

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
  <Consumer>
    {
      ({ toggleExpand }) => (
        <Row>
          <Col span={18}>
            <SimpleBarChart data={testResults} rootDir={rootDir} />
          </Col>
          <Col span={6}>
            <p className='chart_title'>
              <Icon type='pie-chart' theme='filled' style={{ marginRight: '5px' }} />
            Ratio
            </p>
            <ResponsiveContainer width={'100%'} height={300}>
              <PieChart>
                <Pie
                  data={getFormatData(testResults)}
                  dataKey='time'
                  cx='50%'
                  cy='50%'
                  outerRadius={'90%'}
                  onClick={({ name }) => { scrollTo(name, toggleExpand) }}
                  animationDuration={500} >
                  {
                    testResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 40]} />
                    ))
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col span={24}>
            <Card>
              <p>MaxWorkers: {maxWorkers}</p>
              <p>Time: {getFormatTime(startTime, endTime)}</p>
              <p>RootDir: {rootDir}</p>
            </Card>
          </Col>
        </Row>
      )
    }
  </Consumer>

export default Information
