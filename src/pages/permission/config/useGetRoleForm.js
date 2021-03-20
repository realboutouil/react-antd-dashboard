import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useLocale } from "@locales";
import { useAppState } from "@stores";

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function useGetRoleForm({
  required = false,
  responsive = false,
  name = "form",
  values,
}) {
  const { formatMessage } = useLocale();
  const [formInstance] = Form.useForm();

  const _Form = ({ children, ...props }) => {
    const { device } = useAppState((state) => state.user);

    return (
      <Form
        {...props}
        {...(device === "MOBILE" ? { layout: "vertical" } : layout)}
        form={formInstance}
        name={name}
        initialValues={values}
      >
        {responsive ? <Row>{children}</Row> : children}
      </Form>
    );
  };

  const WrappedForm = _Form;

  WrappedForm.Item = Form.Item;

  const Name = () => {
    const name = (
      <Form.Item
        name="name"
        label={formatMessage("app.permission.role.name")}
        rules={[
          {
            required,
            message: formatMessage("app.permission.role.nameRequired"),
          },
        ]}
      >
        <Input />
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{name}</Col> : name;
  };

  const Code = () => {
    const code = (
      <Form.Item
        name="code"
        label={formatMessage("app.permission.role.code")}
        rules={[
          {
            required,
            message: formatMessage("app.permission.role.codeRequired"),
          },
        ]}
      >
        <Input />
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{code}</Col> : code;
  };

  const Status = () => {
    const status = (
      <Form.Item
        name="status"
        label={formatMessage("app.permission.role.status")}
        rules={[
          {
            required,
            message: formatMessage("app.permission.role.statusRequired"),
          },
        ]}
      >
        <Select>
          <Select.Option key="all" value="all">
            {formatMessage("app.permission.role.status.all")}
          </Select.Option>
          <Select.Option key="enabled" value="enabled">
            {formatMessage("app.permission.role.status.enabled")}
          </Select.Option>
          <Select.Option key="disabled" value="disabled">
            {formatMessage("app.permission.role.status.disabled")}
          </Select.Option>
        </Select>
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{status}</Col> : status;
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    Name,
    Code,
    Status,
  };
}
