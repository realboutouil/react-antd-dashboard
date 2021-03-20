import React from "react";
import { Alert, Spin } from "antd";

const SuspendFallbackLoading = () => {
  return (
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  );
};

export default SuspendFallbackLoading;
