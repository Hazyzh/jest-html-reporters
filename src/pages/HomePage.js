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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.realData,
      globalExpandState: props.realData._reporterOptions.expand || false,
    };
  }

  render() {
    const { _reporterOptions: { customInfos }, config } = this.props.realData;

    return (
      <div>
        <BackTop />
        <Row justify='space-between' align='bottom'>
          <Col>
            <h3 className='area_subject'>
              <AppstoreOutlined /> Dashboard
            </h3>
          </Col>
          {config.collectCoverage &&
            <Col>
              <h3>
                <a href={`${config.coverageDirectory}/lcov-report/index.html`} data-testid='coverage-link'><PercentageOutlined /> Coverage</a>
              </h3>
            </Col>}
        </Row>
        <DashBoard {...this.state} />
        <h3 className='area_subject'>
          <PieChartOutlined /> Information
        </h3>
        <Information {...this.state} customInfos={customInfos || []} />
        <h3 className='area_subject expand_box'>
          <span>
            <ProfileOutlined /> Details
          </span>
          <span className='expand_title'>
            <span className='text'>Expand All</span>
            <Switch
              onChange={(checked) =>
                this.setState({ globalExpandState: checked })}
              checked={this.state.globalExpandState}
            />
          </span>
        </h3>
        <div style={{ background: '#fff', padding: 12 }}>
          <TableItem {...this.state} />
        </div>
      </div>
    );
  }
}

export default HomePage;
