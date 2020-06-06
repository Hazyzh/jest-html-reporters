import React from 'react'
import { Table, Tooltip } from 'antd'
import {
  CheckOutlined,
  Loading3QuartersOutlined,
  CloseOutlined,
  PushpinOutlined
} from '@ant-design/icons'
import { getRecordClass, getFormatTime } from '@/untils'
import ErrorButton from './ErrorButton'

const renderStatus = (status) => {
  let info
  switch (status) {
    case 'passed':
      info = <span style={{ color: 'green' }} >
        <CheckOutlined />
        <span className='detail_status_text'>{status}</span>
      </span>
      break
    case 'pending':
      info = <span style={{ color: '#faad14' }} >
        <Loading3QuartersOutlined />
        <span className='detail_status_text'>{status}</span>
      </span>
      break
    case 'failed' :
      info = <span style={{ color: '#fafafa' }} >
        <CloseOutlined />
        <span className='detail_status_text'>{status}</span>
      </span>
      break
    case 'todo':
      info = <span style={{ color: '#950098' }} >
        <PushpinOutlined />
        <span className='detail_status_text'>{status}</span>
      </span>
      break
  }
  return info
}

const renderTime = ({
  duration
}) => getFormatTime(0, duration)

const MAX_TITLE_LENGTH = 85
const renderTitleContent = (title = '') => {
  const len = title.length
  if (len > MAX_TITLE_LENGTH) {
    return title.substr(0, 85) + '...'
  }
  return title
}

const renderTitle = ({ ancestorTitles = [], title, fullName }) => {
  const sep = ' > '
  const nestedTitle = [...ancestorTitles, title].join(sep)
  return (
    <Tooltip overlayStyle={{ maxWidth: '800px' }} title={fullName}>
      <span className='inner_path_text'>{renderTitleContent(nestedTitle)}</span>
    </Tooltip>
  )
}

const columns = [
  { title: 'title', key: 'Name', render: renderTitle },
  { title: 'UseTime', key: 'UseTime', render: renderTime, width: '150px' },
  { title: 'status', dataIndex: 'status', render: renderStatus, align: 'center', width: '150px' },
  {
    width: '100px',
    title: 'action',
    key: 'operation',
    render: ({ failureMessages }) => <ErrorButton failureMessage={failureMessages[0]} />
  }
]

const DetailTable = ({ data }) =>
  <Table
    bordered
    size='small'
    showHeader={false}
    rowKey={(_, index) => `${index}`}
    rowClassName={({ status }, index) => getRecordClass(status, index)}
    dataSource={data}
    columns={columns}
    pagination={false} />

export default DetailTable
