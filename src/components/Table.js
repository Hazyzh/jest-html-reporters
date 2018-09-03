import React from 'react'
import { Table } from 'antd'
import ErrorInfoItem from './ErrorInfoItem'
const file = '/Users/harry.hou/Desktop/harry/learn/jest_reporter/'

const columns = [
  {
    title: 'file',
    dataIndex: 'testFilePath',
    key: 'name',
    render: text => text.replace(new RegExp('^' + file), '@: ')
  },
  {
    title: 'Platform',
    dataIndex: 'failureMessage',
    render: text => <ErrorInfoItem data={text} />
  },
  { title: 'Action', key: 'operation', render: () => <a href='javascript:;'>Publish</a> },
]

const TableItem = ({ data }) =>
  <Table
    rowKey='testFilePath'
    columns={columns}
    dataSource={data} />

export default TableItem
