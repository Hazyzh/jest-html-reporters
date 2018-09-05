import React, { Component } from 'react'
import data from '../testdata.1.json'
import { Row, Col } from 'antd'
import TableItem from '../components/Table'
import DashBoard from '../components/DashBoard'
console.log(data)

class HomePage extends Component {
  state = {
    ...data
  }
  render () {
    const { testResults } = this.state
    return (
      <div>
        <h3 className='area_subject'>Dashboard</h3>
        <DashBoard {...this.state} />
        <h3 className='area_subject'>Dashboard</h3>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <TableItem data={testResults} />
        </div>
        <Row
          type='flex'
          justify='center'>
          <Col span={24}>
        1
          </Col>
        </Row>
      </div>
    )
  }
}

export default HomePage
