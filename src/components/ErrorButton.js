import React from 'react';

import {
  Card,
  Col,
  List,
  Modal,
  Row,
  Typography,
} from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';

import ErrorInfoItem from './ErrorInfoItem';

const { Meta } = Card;

const imgSupportedFormats = [
  '.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif',
  '.pjpeg', '.pjp', '.png', '.svg', '.webp', '.bmp',
  '.ico', '.cur', '.tiff', '.tif'
];

const videoSupportFormats = ['.3gp', '.mpg', '.mpeg', '.mp4', '.m4v', '.m4p', '.ogv', '.ogg', '.mov', '.webm'];

const IMG_TYPE = 'IMG_TYPE';
const VIDEO_TYPE = 'VIDEO_TYPE';
const UNKNOWN_TYPE = 'UNKNOWN_TYPE';

const getFileType = (extName) => {
  if (imgSupportedFormats.includes(extName)) return IMG_TYPE;
  if (videoSupportFormats.includes(extName)) return VIDEO_TYPE;
  return UNKNOWN_TYPE;
};

const FileNode = ({ description, filePath, extName }) => {
  const fileType = getFileType(extName.toLowerCase());
  switch (fileType) {
    case IMG_TYPE:
      return <img alt={description} src={filePath} />;
    case VIDEO_TYPE:
      return <video controls alt={description} src={filePath} />;
    case UNKNOWN_TYPE:
      return <a target='_blank' rel='noreferrer' alt={description} href={filePath}>file</a>;
  }
};

function info(data, caseAttachInfos, title) {
  Modal.warning({
    title: `FAILURE INFO FOR --> ${title}`,
    width: '80%',
    maskClosable: true,
    content: (
      <Row style={{ flexDirection: 'column' }}>
        <Col span={24}>
          <ErrorInfoItem data={data} caseAttachInfos={caseAttachInfos} />

        </Col>
        <Col span={24}>
          {!!caseAttachInfos.length && (
            <List
              header='Attach'
              bordered
              dataSource={caseAttachInfos}
              sort='createTime'
              renderItem={(item) => (
                <List.Item>
                  {item.filePath ? (
                    <Card
                      hoverable
                      bordered
                      cover={<FileNode {...item} />}
                    >
                      <Meta title={<a href={item.filePath} target='_blank' rel='noreferrer'>Detail</a>} description={item.description} />
                    </Card>
                  ) : (
                    <Typography.Paragraph className='test-log-message' code copyable>
                      {item.description}
                    </Typography.Paragraph>
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

const ErrorButton = ({
  fullName,
  testFilePath,
  failureMessage,
  caseAttachInfos = [],
}) => {
  if (!failureMessage && !caseAttachInfos.length) return null;
  const title = fullName || testFilePath;
  return (
    <div
      className='error_button'
      onClick={() => info(failureMessage, caseAttachInfos, title)}
    >
      <ExclamationCircleFilled />
      Info
    </div>
  );
};

export default ErrorButton;
