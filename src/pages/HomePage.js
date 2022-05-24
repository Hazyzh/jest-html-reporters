import React, { Component } from 'react';

import {
  BackTop,
  Col,
  Row,
  Switch,
} from 'antd';

import {
  AppstoreOutlined,
  PercentageOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

import DashBoard from '../components/DashBoard';
import Information from '../components/Information';
import TableItem from '../components/Table';
import { getExecutionResult } from '../untils';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.realData,
      globalExpandState: props.realData._reporterOptions.expand || false,
      usingExecutionTime: false,
    };
  }

  render() {
    const { _reporterOptions: { customInfos }, config } = this.props.realData;
    const { testResults, usingExecutionTime } = this.state;
    const comProps = { ...this.state, testResults: usingExecutionTime ? getExecutionResult(testResults) : testResults };
    console.log(comProps);
    return (
      <div>
        <BackTop />
        <Row justify='space-between' align='bottom'>
          <Col>
            <h3 className='area_subject'>
              <AppstoreOutlined /> Dashboard
            </h3>
          </Col>
          {config.coverageLinkPath &&
            <Col>
              <h3>
                <a href={`${config.coverageLinkPath}`} data-testid='coverage-link'><PercentageOutlined /> Coverage</a>
              </h3>
            </Col>}
        </Row>
        <DashBoard {...comProps} />
        <h3 className='area_subject'>
          <PieChartOutlined /> Information
        </h3>
        <Information {...comProps} customInfos={customInfos || []} />
        <h3 className='area_subject expand_box'>
          <span>
            <ProfileOutlined /> Details
          </span>
          <span className='expand_title'>
            <span className='text'>Show Execution Time</span>
            <Switch
              onChange={(checked) =>
                this.setState({ usingExecutionTime: checked })}
              checked={this.state.usingExecutionTime}
            />
            { ' ' }
            <span className='text'>Expand All</span>
            <Switch
              onChange={(checked) =>
                this.setState({ globalExpandState: checked })}
              checked={this.state.globalExpandState}
            />
          </span>
        </h3>
        <div style={{ background: '#fff', padding: 12 }}>
          <TableItem {...comProps} />
        </div>
      </div>
    );
  }
}

export default HomePage;
