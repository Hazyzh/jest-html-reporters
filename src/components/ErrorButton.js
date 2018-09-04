
import React from 'react'
import { Row, Col, Icon, Button, Modal } from 'antd'
import ErrorInfoItem from './ErrorInfoItem'

function info(data) {
  Modal.info({
    title: 'This is the failureMessage',
    width: '80%',
    maskClosable: true,
    content: (
      <Row>
        <Col span={24}>
          <ErrorInfoItem data={data} />
        </Col>
      </Row>
    ),
    onOk() {},
  })
}

const ErrorButton = ({ failureMessage }) => {
  if (!failureMessage) return null
  return <Button
    type='danger'
    size='small'
    onClick={() => info(failureMessage)}>
    <Icon type='info-circle' theme='outlined' /> FailInfo
  </Button>
}

export default ErrorButton
