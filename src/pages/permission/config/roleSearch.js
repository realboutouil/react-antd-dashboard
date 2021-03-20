import React from "react";
import useGetRoleFormItem from "./useGetRoleForm";
import { Button } from "antd";
import { useLocale } from "@locales";

const RoleSearch = () => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({
    name: "searchForm",
    responsive: true,
  });
  const { formatMessage } = useLocale();

  const onSearch = () => {
    //
  };

  return (
    <Form>
      <Name />
      <Code />
      <Status />
      <Form.Item>
        <Button type="primary" onClick={onSearch}>
          {formatMessage("global.tips.search")}
        </Button>
        <Button onClick={() => form.resetFields()}>
          {formatMessage("global.tips.reset")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleSearch;
