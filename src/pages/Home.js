import React, { Component } from 'react'
import { BackTop, Icon } from 'antd'
import TableItem from '../components/Table'
import DashBoard from '../components/DashBoard'
import Information from '../components/Information'
let data
if (process.env.NODE_ENV === 'production') {
  data = JSON.parse(window.resData)
} else {
  data = require('../testdata.1.json')
}
window.c = data
class HomePage extends Component {
  state = {
    ...data
  }
  render () {
    return (
      <div>
        <BackTop />
        <h3 className='area_subject'><Icon type='appstore' theme='outlined' />Dashboard</h3>
        <DashBoard {...this.state} />
        <h3 className='area_subject'><Icon type='pie-chart' theme='outlined' />Information</h3>
        <Information {...this.state} />
        <h3 className='area_subject'><Icon type='profile' theme='outlined' />Details</h3>
        <div style={{ background: '#fff', padding: 12 }}>
          <TableItem {...this.state} />
        </div>
      </div>
    )
  }
}

export default HomePage
