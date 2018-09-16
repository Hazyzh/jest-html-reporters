import React from 'react'
import { Table, Icon, Tag } from 'antd'
import { getRecordClass, getFormatTime } from '@/untils'
import DetailTable from './DetailTable'
import ErrorButton from './ErrorButton'

// export const file = '/Users/harry.hou/Desktop/harry/salesforce/salesforce-cti-widget/'

const renderStatus = ({
  numPassingTests,
  numFailingTests,
  numPendingTests,
  testExecError,
}) => {
  let tagsInfo
  if (
    testExecError
  ) {
    tagsInfo = <span style={{ color: '#52c41a' }}>
      <Tag color='#cf1322' className='one_tag'>
        Exec Error
        <span />
        <Icon type='close' theme='outlined' />
      </Tag>
    </span>
  } else if (numFailingTests === 0 && numPendingTests === 0) {
    tagsInfo = <span style={{ color: '#52c41a' }}>
      <Tag color='#52c41a' className='one_tag'>
        All Passd
        <span>{numPassingTests}</span>
        <Icon type='check' theme='outlined' />
      </Tag>
    </span>
  } else {
    tagsInfo = <span>
      <Tag color='#52c41a'>{numPassingTests}</Tag>
      {!!numFailingTests && <Tag color='#cf1322'>{numFailingTests}</Tag>}
      {!!numPendingTests && <Tag color='#faad14'>{numPendingTests}</Tag>}
    </span>
  }

  return (
    <div className='mian_table_tags'>
      {tagsInfo}
    </div>
  )
}

const renderTime = ({
  perfStats: { start, end }
}) => getFormatTime(start, end)

const getColumns = (rootDir) => [
  {
    title: 'File',
    dataIndex: 'testFilePath',
    key: 'name',
    render: text => {
      const relativePath = text.replace(new RegExp('^' + rootDir), '')
      return <span>
        <Icon type='file' theme='twoTone' />
        <span className='path_text' id={text}> {relativePath}</span>
      </span>
    }
  },
  { title: 'UseTime', key: 'UseTime', render: renderTime, width: '150px' },
  { title: 'Status', key: 'status', render: renderStatus, width: '150px' },
  {
    width: '100px',
    title: 'Action',
    key: 'operation',
    render: ({ failureMessage }) => <ErrorButton failureMessage={failureMessage} />
  },
]

const TableItem = ({ testResults, config: { rootDir } }) =>
  <Table
    size='small'
    pagination={false}
    rowKey='testFilePath'
    rowClassName={({ numFailingTests, numPendingTests, testExecError }, index) => {
      let status = ''
      if (testExecError) status = 'failed'
      if (numFailingTests) status = 'failed'
      if (numPendingTests) status = 'pending'
      return getRecordClass(status, index)
    }}
    expandedRowRender={
      ({ testResults }) => <DetailTable data={testResults} />
    }
    columns={getColumns(rootDir)}
    dataSource={testResults} />

export default TableItem
