import React from 'react';
import { Card, Col, Tag, Modal, Row, Button, Typography, Divider } from 'antd';

import {
  InfoCircleFilled,
  FieldTimeOutlined,
  InfoCircleTwoTone,
  FileTwoTone,
} from '@ant-design/icons';
import type {
  IAttachInfosItem,
  ITestItem,
} from '../interfaces/ReportData.interface';

import ErrorInfoItem from './ErrorInfoItem';
import { formatDate } from '../utils/index';
const { Meta } = Card;
const { Text } = Typography;

const imgSupportedFormats = [
  '.apng',
  '.avif',
  '.gif',
  '.jpg',
  '.jpeg',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.png',
  '.svg',
  '.webp',
  '.bmp',
  '.ico',
  '.cur',
  '.tiff',
  '.tif',
];

const videoSupportFormats = [
  '.3gp',
  '.mpg',
  '.mpeg',
  '.mp4',
  '.m4v',
  '.m4p',
  '.ogv',
  '.ogg',
  '.mov',
  '.webm',
];

const IMG_TYPE = 'IMG_TYPE';
const VIDEO_TYPE = 'VIDEO_TYPE';
const UNKNOWN_TYPE = 'UNKNOWN_TYPE';

const getFileType = (extName: string) => {
  if (imgSupportedFormats.includes(extName)) return IMG_TYPE;
  if (videoSupportFormats.includes(extName)) return VIDEO_TYPE;
  return UNKNOWN_TYPE;
};

const FileNode = ({ description, filePath, extName }: any) => {
  const fileType = getFileType(extName.toLowerCase());
  switch (fileType) {
    case IMG_TYPE:
      return <img alt={description} src={filePath} />;
    case VIDEO_TYPE:
      return <video controls title={description} src={filePath} />;
    case UNKNOWN_TYPE:
      return (
        <a target='_blank' rel='noreferrer' title={description} href={filePath}>
          file
        </a>
      );
  }
};

const LogsInfoView = ({ logsInfo }: { logsInfo: ITestItem['console'] }) => {
  return (
    <Col span={24} className='log-box'>
      {logsInfo?.map((item, index) => (
        <Row key={`item.type - ${index}`}>
          <Row
            align='middle'
            wrap={false}
            style={{ width: '100%', margin: '10px' }}
          >
            <Col flex='none' style={{ color: 'red' }}>
              <Tag icon={<InfoCircleTwoTone />}>Info Type: {item.type} </Tag>
            </Col>
            <Col flex='auto'>
              <pre className='log_pre'> {item.message}</pre>
            </Col>
          </Row>
          <Row>{<pre className='log_origin'> {item.origin}</pre>}</Row>
        </Row>
      ))}
    </Col>
  );
};

function getModalConfig(
  data: string | undefined,
  caseAttachInfos: IAttachInfosItem[],
  title: string | undefined,
  logsInfo: ITestItem['console']
) {
  return {
    title: `INFO FOR --> ${title}`,
    width: '80%',
    maskClosable: true,
    content: (
      <Row style={{ flexDirection: 'column' }}>
        <Col span={24}>
          <ErrorInfoItem data={data} />
        </Col>
        {logsInfo && (
          <>
            <Divider><InfoCircleTwoTone/> Console Logs Infos</Divider>
            <LogsInfoView logsInfo={logsInfo} />
          </>
        )}
        {!!caseAttachInfos.length && (
          <>
            {' '}
            <Divider><FileTwoTone /> Attach Log Infos</Divider>{' '}
            <Col span={24}>
              <Row gutter={24}>
                {caseAttachInfos.map((item) =>
                  item.filePath ? (
                    <Col xs={24} sm={12} md={8}>
                      <Card hoverable bordered cover={<FileNode {...item} />}>
                        <Meta
                          title={
                            <>
                              <a
                                href={item.filePath}
                                target='_blank'
                                rel='noreferrer'
                              >
                                Detail
                              </a>
                              {` `}
                              <Text italic type='secondary'>
                                {formatDate(item.createTime)}
                              </Text>
                            </>
                          }
                          description={item.description}
                        />
                      </Card>
                    </Col>
                  ) : (
                    <Col span={24}>
                      <Row align='middle'>
                        <Col flex='none'>
                          <Tag icon={<FieldTimeOutlined />}>
                            {formatDate(item.createTime)}
                          </Tag>
                        </Col>
                        <Col flex='auto'>
                          <pre className='log_pre'> {item.description}</pre>
                        </Col>
                      </Row>
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </>
        )}
      </Row>
    ),
  };
}

export const ErrorButton = ({
  fullName,
  testFilePath,
  failureMessage,
  caseAttachInfos = [],
  logsInfo,
}: {
  testFilePath?: string;
  fullName?: string;
  failureMessage?: string;
  caseAttachInfos?: IAttachInfosItem[];
  logsInfo?: ITestItem['console'];
}) => {
  const [modal, contextHolder] = Modal.useModal();
  const title = fullName || testFilePath;
  if (!failureMessage && !caseAttachInfos.length && !logsInfo) return null;

  const isError = !!failureMessage;
  return (
    <>
      {contextHolder}
      <Button
        data-sign='ErrorButton'
        danger={isError}
        type='primary'
        onClick={() =>
          modal.warning(
            getModalConfig(failureMessage, caseAttachInfos, title, logsInfo)
          )
        }
      >
        <InfoCircleFilled />
        Info
      </Button>
    </>
  );
};
