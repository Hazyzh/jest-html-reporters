import React, { Component } from 'react'
import data from '../testdata.json'
import { BackTop, Icon } from 'antd'
import TableItem from '../components/Table'
import DashBoard from '../components/DashBoard'
import Information from '../components/Information'
console.log(data)

class HomePage extends Component {
  state = {
    config: {
      rootDir: '/Users/harry.hou/Desktop/harry/salesforce/salesforce-cti-widget/'
    },
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
        <h3 className='area_subject'><Icon type='pie-chart' theme='outlined' />Information</h3>
        <div style={{ background: '#fff', padding: 12 }}>
          <TableItem {...this.state} />
        </div>
      </div>
    )
  }
}

export default HomePage
