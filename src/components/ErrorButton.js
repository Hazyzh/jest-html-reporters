import React from "react";
import { Row, Col, Modal, List, Card } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ErrorInfoItem from "./ErrorInfoItem";

const { Meta } = Card;

function info(data, caseAttachInfos, title) {
  Modal.warning({
    title: `INFO FOR --> ${title}`,
    width: "80%",
    maskClosable: true,
    content: (
      <Row style={{ flexDirection: "column" }}>
        <Col span={24}>
          <ErrorInfoItem data={data} caseAttachInfos={caseAttachInfos} />
        </Col>
        {!!caseAttachInfos.length && (
          <List
            header="Attach"
            bordered
            className="ant-col-24"
            dataSource={caseAttachInfos}
            renderItem={(item) => (
              <List.Item>
                {item.filePath ? (
                  <Card
                    hoverable
                    bordered
                    className="ant-col-8"
                    cover={<img alt={item.description} src={item.filePath} />}
                  >
                    <Meta title={item.description} />
                  </Card>
                ) : (
                  <Card className="ant-col-24" bordered={false}>
                    <pre style={{ "max-height": "200px", overflow: "auto" }}>
                      {item.description}
                    </pre>
                  </Card>
                )}
              </List.Item>
            )}
          />
        )}
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
      className="error_button"
      onClick={() => info(failureMessage, caseAttachInfos, title)}
    >
      <ExclamationCircleFilled />
      Info
    </div>
  );
};

export default ErrorButton;
