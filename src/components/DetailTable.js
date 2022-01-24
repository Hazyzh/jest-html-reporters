import React, { useState } from 'react';

import {
  Checkbox,
  InputNumber,
  Table,
  Tooltip,
} from 'antd';

import {
  formatCollapsableData,
  getRecordClass,
  renderRootRowClass,
} from '@/untils';
import {
  CheckOutlined,
  CloseOutlined,
  Loading3QuartersOutlined,
  PushpinOutlined,
} from '@ant-design/icons';

import ErrorButton from './ErrorButton';
import { renderStatus as parentRowRenderStatus } from './Table';
import { getFormatTimeDisplay } from '../untils';

const renderStatus = ({ status }) => {
  let info;
  switch (status) {
    case 'passed':
      info = (
        <span style={{ color: 'green' }}>
          <CheckOutlined />
          <span className='detail_status_text'>{status}</span>
        </span>
      );
      break;
    case 'pending':
      info = (
        <span style={{ color: '#faad14' }}>
          <Loading3QuartersOutlined />
          <span className='detail_status_text'>{status}</span>
        </span>
      );
      break;
    case 'failed':
      info = (
        <span style={{ color: '#fafafa' }}>
          <CloseOutlined />
          <span className='detail_status_text'>{status}</span>
        </span>
      );
      break;
    case 'todo':
      info = (
        <span style={{ color: '#950098' }}>
          <PushpinOutlined />
          <span className='detail_status_text'>{status}</span>
        </span>
      );
      break;
  }
  return info;
};

const renderTime = ({ duration, subGroups }) =>
  !subGroups && getFormatTimeDisplay(0, duration);

const renderTitle = ({
  ancestorTitles = [],
  subGroups,
  subTitle,
  title,
  fullName,
}) => {
  const sep = ' > ';
  const nestedTitle = subGroups
    ? subTitle
    : [...ancestorTitles, title].join(sep);
  const tooltip = subGroups ? subTitle : nestedTitle;

  return (
    <Tooltip overlayStyle={{ maxWidth: '800px' }} title={tooltip}>
      <div>
        <span className='inner_path_text'>{nestedTitle}</span>
      </div>
    </Tooltip>
  );
};

const columns = [
  { title: 'title', key: 'Name', ellipsis: true, render: renderTitle },
  { title: 'ExecTime', key: 'ExecTime', render: renderTime, width: '150px' },
  {
    title: 'status',
    align: 'center',
    width: '150px',
    render: (item) =>
      item.subGroups ? parentRowRenderStatus(item) : renderStatus(item),
  },
  {
    width: '100px',
    title: 'action',
    key: 'operation',
    render: ({ failureMessages, fullName, fileAttachInfos, subGroups }) =>
      !subGroups && (
        <ErrorButton
          caseAttachInfos={fileAttachInfos[fullName]}
          failureMessage={failureMessages[0]}
          fullName={fullName}
        />
      ),
  },
];

export const DetailTable = ({ data }) => (
  <Table
    bordered
    size='small'
    showHeader={false}
    rowKey={(_, index) => `${index}`}
    rowClassName={({ status }, index) => getRecordClass(status, index)}
    dataSource={data}
    columns={columns}
    pagination={false}
  />
);

const RootTable = ({ data = [], defaultMerge, defaultMergeLevel }) => {
  const numerousTests = data.length > 8;
  const [isMergence, setIsMergence] = useState(numerousTests && defaultMerge);
  const [mergeLevel, setMergeLevel] = useState(defaultMergeLevel);
  return (
    <div>
      {numerousTests && (
        <div className='merge-box'>
          <Checkbox
            checked={isMergence}
            onChange={(e) => setIsMergence(e.target.checked)}
          >
            Merge Data
          </Checkbox>
          {isMergence && (
            <span>
              | Merge Level:{' '}
              <InputNumber
                size='small'
                min={1}
                max={10}
                value={mergeLevel}
                onChange={setMergeLevel}
              />
            </span>
          )}
        </div>
      )}

      <Table
        bordered
        size='small'
        showHeader={false}
        rowKey={(_, index) => `${index}`}
        expandable={{
          expandedRowRender: ({ tests }) => <DetailTable data={tests} />,
          rowExpandable: (record) => record.subGroups,
        }}
        rowClassName={({ status, subGroups, ...rest }, index) =>
          subGroups
            ? renderRootRowClass({ ...rest })
            : getRecordClass(status, index)}
        dataSource={isMergence ? formatCollapsableData(data, mergeLevel) : data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default RootTable;
