import React from "react";
import { Badge, Card, Col, Progress, Row, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ReactComponent as CaretUpIcon } from "./assets/caret-up.svg";
import { ReactComponent as CaretDownIcon } from "./assets/caret-down.svg";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
} from "recharts";
import moment from "moment";
import { useLocale } from "@locales";

const data = new Array(14).fill(null).map((_, index) => ({
  name: moment().add(index, "day").format("YYYY-MM-DD"),
  number: Math.floor(Math.random() * 8 + 1),
}));
const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6,
};

const ColCard = ({ metaName, metaCount, body, footer, loading }) => {
  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false}>
        <div className="overview-header">
          <div className="overview-header-meta">{metaName}</div>
          <div className="overview-header-count">{metaCount}</div>
          <Tooltip title="Introduce">
            <InfoCircleOutlined className="overview-header-action" />
          </Tooltip>
        </div>
        <div className="overview-body">{body}</div>
        <div className="overview-footer">{footer}</div>
      </Card>
    </Col>
  );
};

const Trend = ({ wow, dod, style = {} }) => {
  const { formatMessage } = useLocale();
  return (
    <div className="trend" style={style}>
      <div className="trend-item">
        <span className="trend-item-label">
          {formatMessage("app.dashboard.overview.wowChange")}
        </span>
        <span className="trend-item-text">{wow}</span>
        <CaretUpIcon color="#f5222d" />
      </div>
      <div className="trend-item">
        <span className="trend-item-label">
          {formatMessage("app.dashboard.overview.dodChange")}
        </span>
        <span className="trend-item-text">{dod}</span>
        <CaretDownIcon color="#52c41a" />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) =>
  active && (
    <div className="customTooltip">
      <span className="customTooltip-title">
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );

const Field = ({ name, number }) => (
  <div className="field">
    <span className="field-label">{name}</span>
    <span className="field-number">{number} </span>
  </div>
);

const Overview = ({ loading }) => {
  const { formatMessage } = useLocale();

  return (
    <Row gutter={[12, 12]}>
      <ColCard
        loading={loading}
        metaName={formatMessage("app.dashboard.overview.totalSales")}
        metaCount="$ 126,560"
        body={<Trend wow="12%" dod="12%" />}
        footer={
          <Field
            name={formatMessage("app.dashboard.overview.dailySales")}
            number="$12,423"
          />
        }
      />
      <ColCard
        loading={loading}
        metaName={formatMessage("app.dashboard.overview.visits")}
        metaCount="8846"
        body={
          <ResponsiveContainer>
            <AreaChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip content={<CustomTooltip />} />
              <Area
                strokeOpacity={0}
                type="monotone"
                dataKey="number"
                fill="#8E65D3"
              />
            </AreaChart>
          </ResponsiveContainer>
        }
        footer={
          <Field
            name={formatMessage("app.dashboard.overview.dailySales")}
            number="1234"
          />
        }
      />
      <ColCard
        loading={loading}
        metaName={formatMessage("app.dashboard.overview.payments")}
        metaCount="6560"
        body={
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip content={<CustomTooltip />} />
              <Bar
                strokeOpacity={0}
                barSize={10}
                dataKey="number"
                stroke="#3B80D9"
                fill="#3B80D9"
              />
            </BarChart>
          </ResponsiveContainer>
        }
        footer={
          <Field
            name={formatMessage("app.dashboard.overview.conversionRate")}
            number="60%"
          />
        }
      />
      <ColCard
        loading={loading}
        metaName={formatMessage("app.dashboard.overview.operationalEffect")}
        metaCount="8846"
        body={<Progress strokeColor="#58BFC1" percent={85} />}
        footer={<Trend style={{ position: "inherit" }} wow="12%" dod="12%" />}
      />
    </Row>
  );
};

export default Overview;
