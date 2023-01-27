import React from 'react';
import { Card, Col, List, Modal, Row, Button } from 'antd';

import { InfoCircleFilled } from '@ant-design/icons';
import type { IAttachInfosItem } from '../interfaces/ReportData.interface';

import ErrorInfoItem from './ErrorInfoItem';

const { Meta } = Card;

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

function info(
  data: string | undefined,
  caseAttachInfos: IAttachInfosItem[],
  title: string | undefined
) {
  Modal.warning({
    title: `INFO FOR --> ${title}`,
    width: '80%',
    maskClosable: true,
    content: (
      <Row style={{ flexDirection: 'column' }}>
        <Col span={24}>
          <ErrorInfoItem data={data} />
        </Col>
        <Col span={24}>
          {!!caseAttachInfos.length && (
            <List
              header='Attach'
              bordered
              dataSource={caseAttachInfos}
              renderItem={(item) => (
                <List.Item>
                  {item.filePath ? (
                    <Card hoverable bordered cover={<FileNode {...item} />}>
                      <Meta
                        title={
                          <a
                            href={item.filePath}
                            target='_blank'
                            rel='noreferrer'
                          >
                            Detail
                          </a>
                        }
                        description={item.description}
                      />
                    </Card>
                  ) : (
                    <pre style={{ width: '100%' }}>{item.description}</pre>
                  )}
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    ),
  });
}

export const ErrorButton = ({
  fullName,
  testFilePath,
  failureMessage,
  caseAttachInfos = [],
}: {
  testFilePath?: string;
  fullName?: string;
  failureMessage?: string;
  caseAttachInfos?: IAttachInfosItem[];
}) => {
  if (!failureMessage && !caseAttachInfos.length) return null;
  const title = fullName || testFilePath;
  return (
    <Button
      data-sign='ErrorButton'
      danger
      type='primary'
      onClick={() => info(failureMessage, caseAttachInfos, title)}
    >
      <InfoCircleFilled />
      Info
    </Button>
  );
};
