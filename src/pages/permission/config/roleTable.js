import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LocaleFormatter, useLocale } from "@locales";
import { apiGetRoleList } from "../../../api/permission/role.api";
import { useAppState } from "@stores";

const TagColor = {
  enabled: "success",
  disabled: "error",
};
const RoleTable = ({ onCreate, onModify, onAuthorize }) => {
  const { formatMessage } = useLocale();
  const [tableData, setTableData] = useState();
  const { locale } = useAppState((state) => state.user);

  const initData = useCallback(async () => {
    const { result, status } = await apiGetRoleList();
    if (status) {
      setTableData(result);
    }
  }, []);

  const getLocaleStatus = (status) => {
    switch (status) {
      case "enabled":
        return formatMessage("app.permission.role.status.disabled");
    }
  };

  useEffect(() => {
    initData();
  }, [initData]);
  return (
    <Table
      rowKey="id"
      dataSource={tableData}
      scroll={{ x: 500 }}
      title={() => (
        <Button type="primary" onClick={onCreate}>
          <LocaleFormatter id="global.tips.create" />
        </Button>
      )}
    >
      <Table.Column
        title={formatMessage("app.permission.role.name")}
        width={100}
        render={(_, { name }) => name[locale]}
      />
      <Table.Column
        title={formatMessage("app.permission.role.code")}
        dataIndex="code"
        width={100}
      />
      <Table.Column
        title={formatMessage("app.permission.role.status")}
        width={100}
        render={(_, { status }) => (
          <Tag color={TagColor[status]}>{getLocaleStatus(status)}</Tag>
        )}
      />
      <Table.Column
        title={formatMessage("global.tips.operation")}
        width={200}
        align="center"
        render={(_, row) => [
          <Button type="link" key="1" onClick={() => onAuthorize({ ...row })}>
            {formatMessage("global.tips.authorize")}
          </Button>,
          <Button
            type="link"
            key="2"
            onClick={() =>
              onModify({
                ...row,
                name: row.name[locale],
              })
            }
          >
            {formatMessage("global.tips.modify")}
          </Button>,
          <Button
            type="link"
            key="3"
            onClick={() => {
              Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                title: formatMessage("global.tips.deleteConfirm"),
              });
            }}
          >
            {formatMessage("global.tips.delete")}
          </Button>,
        ]}
      />
    </Table>
  );
};

export default RoleTable;
