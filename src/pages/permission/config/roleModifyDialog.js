import React from "react";
import { Modal } from "antd";
import useGetRoleFormItem from "./useGetRoleForm";
import { useLocale } from "@locales";

const RoleModifyDialog = ({ onModify, onCancel, visible, values }) => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({
    name: "modifyForm",
    required: true,
    values,
  });
  const { formatMessage } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();
    onModify(values);
  };

  return (
    <Modal
      title={formatMessage("global.tips.modify")}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <Form>
        <Name />
        <Code />
        <Status />
      </Form>
    </Modal>
  );
};

export default RoleModifyDialog;
