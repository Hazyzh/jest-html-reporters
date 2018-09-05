import React from 'react'
import { Table, Icon, Badge } from 'antd'
import { getRecordClass } from '@/untils'
import DetailTable from './DetailTable'
import ErrorButton from './ErrorButton'

export const file = '/Users/harry.hou/Desktop/harry/salesforce/salesforce-cti-widget/'

const TYPE_MAP = {
  'pass': { backgroundColor: '#52c41a' },
  'fail': {},
  'pending': { backgroundColor: '#faad14' }
}

const getNumber = type => text =>
  <Badge
    count={text}
    style={TYPE_MAP[type]} />

const columns = [
  {
    title: 'File',
    dataIndex: 'testFilePath',
    key: 'name',
    render: text => {
      const relativePath = text.replace(new RegExp('^' + file), '')
      return <span>
        <Icon type='file' theme='twoTone' />
        <span className='path_text'> {relativePath}</span>
      </span>
    }
  },
  { title: 'Pass', dataIndex: 'numPassingTests', render: getNumber('pass') },
  { title: 'Fail', dataIndex: 'numFailingTests', render: getNumber('fail') },
  { title: 'Pending', dataIndex: 'numPendingTests', render: getNumber('pending') },
  { title: 'Action', key: 'operation', render: ({ failureMessage }) => <ErrorButton failureMessage={failureMessage} /> },
]

const TableItem = ({ data }) =>
  <Table
    bordered
    pagination={false}
    rowKey='testFilePath'
    rowClassName={({ numFailingTests, numPendingTests }, index) => {
      let status = ''
      if (numFailingTests) status = 'failed'
      if (numPendingTests) status = 'pending'
      return getRecordClass(status, index)
    }}
    expandedRowRender={
      ({ testResults }) => <DetailTable data={testResults} />
    }
    columns={columns}
    dataSource={data} />

export default TableItem
