
import React from 'react'
import { Row, Col, Icon, Button, Modal } from 'antd'
import ErrorInfoItem from './ErrorInfoItem'

function info(data) {
  Modal.error({
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
  })
}

const ErrorButton = ({ failureMessage }) => {
  if (!failureMessage) return null
  return <Button
    ghost
    type='dashed'
    size='small'
    onClick={() => info(failureMessage)}>
    <Icon type='exclamation-circle' theme='filled' /> Info
  </Button>
}

export default ErrorButton
