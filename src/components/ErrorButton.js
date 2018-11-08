
import React from 'react'
import { Row, Col, Icon, Modal } from 'antd'
import ErrorInfoItem from './ErrorInfoItem'

function info(data) {
  Modal.error({
    title: 'Failure Message',
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
  return <div
    className='error_button'
    onClick={() => info(failureMessage)}>
    <Icon type='exclamation-circle' theme='filled' /> Info
  </div>
}

export default ErrorButton
