import React from "react";
import { Modal } from "antd";
import useGetRoleFormItem from "./useGetRoleForm";
import { useLocale } from "@locales";

const RoleCreateDialog = ({ onCreate, onCancel, visible }) => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({
    name: "createForm",
    required: true,
  });
  const { formatMessage } = useLocale();

  return (
    <Modal
      title={formatMessage("global.tips.create")}
      visible={visible}
      onOk={async () => onCreate(await form.validateFields())}
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

export default RoleCreateDialog;
