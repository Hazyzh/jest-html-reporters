
import React from 'react'
import { Row, Col, Modal, List, Card } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import ErrorInfoItem from './ErrorInfoItem'

const { Meta } = Card

function info(data, caseAttachInfos) {
  Modal.warning({
    title: 'Case Infos',
    width: '80%',
    maskClosable: true,
    content: (
      <Row>
        <Col span={24}>
          <ErrorInfoItem data={data} caseAttachInfos={caseAttachInfos} />
        </Col>
        {!!caseAttachInfos.length && (
          <List
            header='Attach'
            bordered
            grid={{ gutter: 16, column: 2 }}
            dataSource={caseAttachInfos}
            renderItem={item => (
              <List.Item>
                <Card
                  hoverable
                  bordered
                  style={{ width: '100%' }}
                  cover={<img alt={item.description} src={item.filePath} />}
                >
                  <Meta title={item.description} />
                </Card>
              </List.Item>
            )}
          />
        )}
      </Row>
    ),
  })
}

const ErrorButton = ({ failureMessage, caseAttachInfos = [] }) => {
  if (!failureMessage && !caseAttachInfos.length) return null
  return <div
    className='error_button'
    onClick={() => info(failureMessage, caseAttachInfos)}>
    <ExclamationCircleFilled />
    Info
  </div>
}

export default ErrorButton
