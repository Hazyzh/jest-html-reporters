import React, { Component } from 'react'
import { BackTop, Icon, Switch } from 'antd'
import TableItem from '../components/Table'
import DashBoard from '../components/DashBoard'
import Information from '../components/Information'
import CustomInformation from '../components/CustomInformation'

class HomePage extends Component {
  state = {
    ...window.realData,
    globalExpandState: window.realData._reporterOptions.expand || false,
  }
  render () {
    const { customInfos } = window.realData._reporterOptions
    let CustomInfoComp
    if (customInfos && customInfos.length > 0) {
      CustomInfoComp = (
        <>
          <h3 className='area_subject'><Icon type='gold' theme='outlined' />Custom Information</h3>
          <CustomInformation customInfos={customInfos} />
        </>
      )
    }
    return (
      <div>
        <BackTop />
        <h3 className='area_subject'><Icon type='appstore' theme='outlined' />Dashboard</h3>
        <DashBoard {...this.state} />
        {CustomInfoComp}
        <h3 className='area_subject'><Icon type='pie-chart' theme='outlined' />Information</h3>
        <Information {...this.state} />
        <h3 className='area_subject expand_box'>
          <span><Icon type='profile' theme='outlined' />Details</span>
          <span className='expand_title'>
            <span className='text'>Expand All</span>
            <Switch
              onChange={(checked) => this.setState({ globalExpandState: checked })}
              checked={this.state.globalExpandState} />
          </span>
        </h3>
        <div style={{ background: '#fff', padding: 12 }}>
          <TableItem {...this.state} />
        </div>
      </div>
    )
  }
}

export default HomePage
