import React from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { useAppState } from "@stores";
import { useLocale } from "@locales";

const PrivateRoute = (props) => {
  const { logged } = useAppState((state) => state.user);
  const { formatMessage } = useLocale();

  const navigate = useNavigate();
  const location = useLocation();

  return logged ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage("global.tips.unauthorized")}
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate("/auth", {
              replace: true,
              state: { from: location.pathname },
            })
          }
        >
          {formatMessage("global.tips.goToLogin")}
        </Button>
      }
    />
  );
};

export default PrivateRoute;
