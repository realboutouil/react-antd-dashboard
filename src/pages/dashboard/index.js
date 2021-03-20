import React, { useEffect, useState } from "react";
import "./index.less";
import Overview from "./overview";
import SalePercent from "./salePercent";
import TimeLine from "./timeLine";

const DashBoardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </div>
  );
};

export default DashBoardPage;
