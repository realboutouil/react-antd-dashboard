import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./index.less";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAsync } from "@stores/user.store";
import { useAppDispatch } from "@stores";
import { useLocale } from "@locales";

const initialValues = {
  username: "guest",
  password: "guest",
  // remember: true
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { formatMessage } = useLocale();

  const onFinished = async (form) => {
    const res = dispatch(await loginAsync(form));
    if (!!res) {
      const from = location?.state?.from || { pathname: "/dashboard" };
      navigate(from);
    }
  };

  return (
    <div className="login-page">
      <Form
        onFinish={onFinished}
        className="login-page-form"
        initialValues={initialValues}
      >
        <h2>REACT ANTD ADMIN</h2>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage("app.auth.login.username"),
            },
          ]}
        >
          <Input
            placeholder={formatMessage("app.auth.login.username-message")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage("app.auth.login.password"),
            },
          ]}
        >
          <Input
            type="password"
            placeholder={formatMessage("app.auth.login.password-message")}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>{formatMessage("app.auth.login.remember")}</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="login-page-form_button"
          >
            {formatMessage("app.auth.login.form-button")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
