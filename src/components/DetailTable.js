import React from 'react'
import { Table } from 'antd'
import { getRecordClass } from '@/untils'
import ErrorButton from './ErrorButton'

const columns = [
  { title: 'title', dataIndex: 'title' },
  { title: 'status', dataIndex: 'status' },
  {
    title: 'action',
    key: 'operation',
    render: ({ failureMessages }) => <ErrorButton failureMessage={failureMessages[0]} />
  }
]

const DetailTable = ({ data }) =>
  <Table
    showHeader={false}
    rowKey={(_, index) => `${index}`}
    rowClassName={({ status }, index) => getRecordClass(status, index)}
    dataSource={data}
    columns={columns}
    pagination={false} />

export default DetailTable
