import { useRef } from 'react';

import { Table, Tag, theme, Typography } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';

import type { IMainTableProps } from '../interfaces/Table.interface';
import type { ITestItem } from '../interfaces/ReportData.interface';
import type { ColumnsType } from 'antd/es/table';

import {
  CheckOutlined,
  CloseOutlined,
  SelectOutlined,
} from '@ant-design/icons';

import { ExpandContext } from '../contexts/expand';

import DetailTable from './DetailTable';
import { ErrorButton } from './ErrorButton';

import {
  getExistKeys,
  renderRootRowClass,
  getFormatTimeDisplay,
} from '../utils/index';

const { Text } = Typography;
export const renderStatus = ({
  numPassingTests,
  numFailingTests,
  numPendingTests,
  numTodoTests,
  testExecError,
  colorToken,
}: ITestItem & { colorToken: GlobalToken }) => {
  const { colorError, colorWarning, colorSuccess } = colorToken || {};
  let tagsInfo;
  if (testExecError) {
    tagsInfo = (
      <span style={{ color: colorSuccess }}>
        <Tag color={colorError} className='one_tag'>
          Exec Error
          <span />
          <CloseOutlined />
        </Tag>
      </span>
    );
  } else if (numFailingTests === 0 && numPendingTests === 0) {
    tagsInfo = (
      <span style={{ color: colorSuccess }}>
        <Tag color={colorSuccess} className='one_tag'>
          All Passed
          <span>{numPassingTests}</span>
          <CheckOutlined />
        </Tag>
      </span>
    );
  } else {
    tagsInfo = (
      <span>
        <Tag color={colorSuccess}>{numPassingTests}</Tag>
        {!!numFailingTests && <Tag color={colorError}>{numFailingTests}</Tag>}
        {!!numPendingTests && <Tag color={colorWarning}>{numPendingTests}</Tag>}
        {!!numTodoTests && <Tag color='#d466d6'>{numTodoTests}</Tag>}
      </span>
    );
  }

  return <div className='main_table_tags'>{tagsInfo}</div>;
};

const renderTime = ({ perfStats: { start, end } }: ITestItem) =>
  getFormatTimeDisplay(start, end);

const getColumns = (
  rootDir: string,
  execCommand: string | undefined,
  urlForTestFiles: string | undefined,
  attachInfos: IMainTableProps['attachInfos'],
  logInfoMapping: IMainTableProps['logInfoMapping'],
  colorToken: GlobalToken
): ColumnsType<ITestItem> => [
  {
    title: 'File',
    dataIndex: 'testFilePath',
    key: 'name',
    render: (text) => {
      const relativePath = text.replace(new RegExp('^' + rootDir), '');
      const command = (execCommand ? execCommand : '') + `.${relativePath}`;

      return (
        <div>
          <Text id={text} strong copyable={{ text: command }}>
            {' '}
            {relativePath}
          </Text>
          {urlForTestFiles && (
            <a
              className='go_to_file_icon'
              title='click to see the test file in a web browser.'
              href={`${urlForTestFiles}/${relativePath}`}
              target='_blank' rel="noreferrer"
            >
              <SelectOutlined />
            </a>
          )}
        </div>
      );
    },
  },
  {
    title: 'ExecTime',
    key: 'ExecTime',
    render: renderTime,
    width: '150px',
    sorter: (a, b) =>
      a.perfStats.end -
      a.perfStats.start -
      (b.perfStats.end - b.perfStats.start),
  },
  {
    title: 'Status',
    key: 'status',
    render: (record) => renderStatus({ ...record, colorToken }),
    width: '200px',
    filters: [
      { text: 'Passed', value: 'passed' },
      { text: 'Failed', value: 'failed' },
      { text: 'Pending', value: 'pending' },
      { text: 'Todo', value: 'todo' },
      { text: 'Not Passed', value: 'noPass' },
    ],
    filterMultiple: false,
    onFilter: (
      value,
      { numFailingTests, numPendingTests, testExecError, numTodoTests }
    ) => {
      switch (value) {
        case 'passed':
          return !(testExecError || numFailingTests > 0 || numPendingTests > 0);
        case 'failed':
          return !!testExecError || numFailingTests > 0;
        case 'pending':
          return numPendingTests > 0;
        case 'todo':
          return numTodoTests > 0;
        case 'noPass':
          return !!testExecError || numFailingTests > 0 || numPendingTests > 0;
      }
      return false;
    },
  },
  {
    width: '100px',
    title: 'Action',
    key: 'operation',
    render: ({ testFilePath = '', failureMessage }) => (
      <ErrorButton
        failureMessage={failureMessage}
        testFilePath={testFilePath.replace(new RegExp('^' + rootDir), '')}
        caseAttachInfos={
          (attachInfos?.[testFilePath] &&
            attachInfos?.[testFilePath]['jest-html-reporters-file-attach']) ||
          []
        }
        logsInfo={logInfoMapping[testFilePath]}
      />
    ),
  },
];

export const MainTable = ({
  _reporterOptions,
  testResults,
  config: { rootDir },
  globalExpandState,
  attachInfos,
  logInfoMapping,
}: IMainTableProps) => {
  const box = useRef<HTMLDivElement>(null);
  const {
    token: colorToken,
    theme: { id: themeId },
  } = theme.useToken();
  return (
    <ExpandContext.Consumer>
      {({ expand, toggleExpand }) => (
        <div ref={box} data-sign='tableBox'>
          <Table
            bordered
            pagination={false}
            rowKey='testFilePath'
            rowClassName={(record) => renderRootRowClass(record, themeId)}
            expandable={{
              expandedRowRender: ({ testResults, testFilePath }) => (
                <DetailTable
                  data={testResults.map((item) => ({
                    ...item,
                    fileAttachInfos: attachInfos?.[testFilePath] || {},
                  }))}
                  defaultMerge={_reporterOptions.enableMergeData}
                  defaultMergeLevel={_reporterOptions.dataMergeLevel}
                />
              ),
              expandedRowKeys: getExistKeys(expand, globalExpandState),
              expandedRowClassName: () => 'main-table-expanded-row',
            }}

            onExpand={(state, { testFilePath }) =>
              toggleExpand({ key: testFilePath, state })
            }
            columns={getColumns(
              rootDir,
              _reporterOptions.testCommand,
              _reporterOptions.urlForTestFiles,
              attachInfos,
              logInfoMapping,
              colorToken
            )}
            dataSource={testResults}
          />
        </div>
      )}
    </ExpandContext.Consumer>
  );
};
