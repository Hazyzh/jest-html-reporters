import React, { useState } from 'react';

import { Checkbox, InputNumber, Table, Tooltip, theme } from 'antd';
import type {
  IDetailTableProps,
  IDetailTableItem,
  IColumnsType,
  IFormatCollapsibleItem,
} from '../interfaces/Table.interface';
import type { ColumnsType } from 'antd/es/table';
import type { GlobalToken } from 'antd/es/theme/interface';

import {
  formatCollapsibleData,
  getFormatTimeDisplay,
  getRecordClass,
  renderRootRowClass,
} from '../utils/index';

import {
  CheckOutlined,
  CloseOutlined,
  Loading3QuartersOutlined,
  PushpinOutlined,
} from '@ant-design/icons';

import { ErrorButton } from './ErrorButton';
import { renderStatus as parentRowRenderStatus } from './MainTable';

const renderStatus = ({
  status,
  colorToken,
}: IDetailTableItem & { colorToken: GlobalToken }) => {
  const { colorSuccess, colorWarning, colorErrorBg } = colorToken;
  let info;
  switch (status) {
    case 'passed':
      info = (
        <span style={{ color: colorSuccess }}>
          <CheckOutlined />
          <span className='detail_status_text'>{status}</span>
        </span>
      );
      break;
    case 'pending':
      info = (
        <span style={{ color: colorWarning }}>
          <Loading3QuartersOutlined />
          <span className='detail_status_text'>{status}</span>
        </span>
      );
      break;
    case 'failed':
      info = (
        <span style={{ color: colorErrorBg }}>
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

const renderTime = ({
  duration,
  subGroups,
}: {
  duration: number;
  subGroups: boolean;
}) => !subGroups && getFormatTimeDisplay(0, duration!);

const renderTitle = ({
  ancestorTitles = [],
  subGroups,
  subTitle,
  title,
}: any) => {
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
const getColumns = ({ colorToken }: { colorToken: GlobalToken }) => {
  const columns: ColumnsType<IColumnsType> = [
    { title: 'title', key: 'Name', ellipsis: true, render: renderTitle },
    { title: 'ExecTime', key: 'ExecTime', render: renderTime, width: '150px' },
    {
      title: 'status',
      align: 'center',
      width: '150px',
      render: (item) =>
        item.subGroups
          ? parentRowRenderStatus({ ...item, colorToken })
          : renderStatus({ ...item, colorToken }),
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
  return columns;
};

export const DetailTable = ({ data }: { data: IDetailTableItem[] }) => {
  const { token: colorToken } = theme.useToken();

  return (
    <Table
      bordered
      size='small'
      showHeader={false}
      rowKey={(_, index) => `${index}`}
      rowClassName={(record, index) => {
        return getRecordClass((record as IDetailTableItem).status, index);
      }}
      dataSource={data}
      columns={getColumns({ colorToken })}
      pagination={false}
    />
  );
};

const RootTable = ({
  data = [],
  defaultMerge,
  defaultMergeLevel,
}: IDetailTableProps) => {
  const {
    token: colorToken,
    theme: { id: themeId },
  } = theme.useToken();
  const { colorPrimaryBgHover } = colorToken;
  const numerousTests = data.length > 8;
  const [isMergence, setIsMergence] = useState(numerousTests && defaultMerge);
  const [mergeLevel, setMergeLevel] = useState(defaultMergeLevel);
  return (
    <div>
      {numerousTests && (
        <div className='merge-box' style={{ background: colorPrimaryBgHover }}>
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
                onChange={(number) => number && setMergeLevel(number)}
              />
            </span>
          )}
        </div>
      )}

      <Table
        bordered
        showHeader={false}
        rowKey={(_, index) => `${index}`}
        expandable={{
          expandedRowRender: (record) => {
            if ('subGroups' in record) {
              return <DetailTable data={record.tests} />;
            }
            return null;
          },
          rowExpandable: (record) =>
            'subGroups' in record && !!record.subGroups,
        }}
        rowClassName={(record) => {
          if ('subGroups' in record) {
            return renderRootRowClass(record, themeId);
          }
          return getRecordClass(record.status, themeId);
        }}
        dataSource={isMergence ? formatCollapsibleData(data, mergeLevel) : data}
        columns={getColumns({ colorToken })}
        pagination={false}
      />
    </div>
  );
};

export default RootTable;