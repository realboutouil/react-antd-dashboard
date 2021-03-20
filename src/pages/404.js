import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@locales";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage("global.tips.notfound")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {formatMessage("global.tips.backHome")}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
