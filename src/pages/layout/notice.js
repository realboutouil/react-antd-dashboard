import React, { useEffect, useState } from "react";
import { Avatar, Badge, Dropdown, List, Spin, Tabs, Tag } from "antd";
import { ReactComponent as NoticeSvg } from "@assets/header/notice.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppState } from "@stores";
import { getNoticeList } from "../../api/layout.api";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TabPane } = Tabs;

const EventStatus = {
  todo: "rgba(255,255,255,0.65)",
  urgent: "#f5222d",
  doing: "#faad14",
  processing: "#1890ff",
};
const HeaderNoticeComponent = () => {
  const [visible, setVisible] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { noticeCount } = useAppState((state) => state.user);

  const noticeListFilter = (type) => {
    return noticeList.filter((notice) => notice.type === type);
  };

  const getNotice = async () => {
    setLoading(true);
    const { status, result } = await getNoticeList();
    setLoading(false);
    status && setNoticeList(result);
  };

  useEffect(() => {
    getNotice();
  }, []);

  const tabs = (
    <div>
      <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={`通知(${noticeListFilter("notification").length})`}
            key="1"
          >
            <List
              dataSource={noticeListFilter("notification")}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.title}>{item.title}</a>}
                    description={item.datetime}
                  />
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane tab={`消息(${noticeListFilter("message").length})`} key="2">
            <List
              dataSource={noticeListFilter("message")}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.title}>{item.title}</a>}
                    description={
                      <div className="notice-description">
                        <div className="notice-description-content">
                          {item.description}
                        </div>
                        <div className="notice-description-datetime">
                          {item.datetime}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab={`待办(${noticeListFilter("event").length})`} key="3">
            <List
              dataSource={noticeListFilter("event")}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div className="notice-title">
                        <div className="notice-title-content">{item.title}</div>
                        <Tag color={EventStatus[item.status]}>{item.extra}</Tag>
                      </div>
                    }
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
  return (
    <Dropdown
      overlay={tabs}
      placement="bottomRight"
      trigger={["click"]}
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      overlayStyle={{
        width: 336,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: 8,
        borderRadius: 4,
      }}
    >
      <Badge count={noticeCount} overflowCount={999}>
        <span className="notice" id="notice-center">
          <NoticeSvg className="anticon" />
        </span>
      </Badge>
    </Dropdown>
  );
};

export default HeaderNoticeComponent;
