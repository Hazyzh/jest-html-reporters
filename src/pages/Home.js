import React, { Component } from 'react'
import data from '../testdata.json'
import TableItem from '../components/Table'
import { Row, Col } from 'antd'
console.log(data.testResults)

class HomePage extends Component {
  state = {
    ...data
  }
  render () {
    const { testResults } = this.state
    return (
      <Row
        type='flex'
        justify='center'>
        <Col span={20}>
          <TableItem data={testResults} />
        </Col>
      </Row>
    )
  }
}

export default HomePage
