import React, { useState } from "react";
import { Badge, Card, Col, List, Radio, Row } from "antd";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useLocale } from "@locales";
import { useAppState } from "@stores";

const data = {
  all: [
    { name: { fr_FR: "家用电器", en_US: "appliances" }, value: 4544 },
    { name: { fr_FR: "食用酒水", en_US: "drinks" }, value: 3321 },
    { name: { fr_FR: "个护健康", en_US: "health" }, value: 3113 },
    { name: { fr_FR: "服饰箱包", en_US: "clothing" }, value: 2341 },
    { name: { fr_FR: "母婴产品", en_US: "baby" }, value: 1231 },
    { name: { fr_FR: "其他", en_US: "others" }, value: 132 },
  ],
  online: [
    { name: { fr_FR: "家用电器", en_US: "appliances" }, value: 244 },
    { name: { fr_FR: "食用酒水", en_US: "drinks" }, value: 231 },
    { name: { fr_FR: "个护健康", en_US: "health" }, value: 311 },
    { name: { fr_FR: "服饰箱包", en_US: "clothing" }, value: 41 },
    { name: { fr_FR: "母婴产品", en_US: "baby" }, value: 121 },
    { name: { fr_FR: "其他", en_US: "others" }, value: 111 },
  ],
  offline: [
    { name: { fr_FR: "家用电器", en_US: "appliances" }, value: 99 },
    { name: { fr_FR: "食用酒水", en_US: "drinks" }, value: 188 },
    { name: { fr_FR: "个护健康", en_US: "health" }, value: 344 },
    { name: { fr_FR: "服饰箱包", en_US: "clothing" }, value: 255 },
    { name: { fr_FR: "其他", en_US: "others" }, value: 65 },
  ],
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#E36E7E",
  "#8F66DE",
];

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const SalePercent = ({ loading }) => {
  const [dataType, setDataType] = useState("all");
  const { locale } = useAppState((state) => state.user);
  const { formatMessage } = useLocale();

  return (
    <Card
      className="salePercent"
      title={formatMessage("app.dashboard.salePercent.proportionOfSales")}
      loading={loading}
      extra={
        <Radio.Group
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="all">
            {formatMessage("app.dashboard.salePercent.all")}
          </Radio.Button>
          <Radio.Button value="online">
            {formatMessage("app.dashboard.salePercent.online")}
          </Radio.Button>
          <Radio.Button value="offline">
            {formatMessage("app.dashboard.salePercent.offline")}
          </Radio.Button>
        </Radio.Group>
      }
    >
      <Row gutter={20}>
        <Col {...wrapperCol}>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active) {
                    const { name, value } = payload[0];
                    const total = data[dataType]
                      .map((d) => d.value)
                      .reduce((a, b) => a + b);
                    const percent = ((value / total) * 100).toFixed(2) + "%";
                    return (
                      <span className="customTooltip">
                        {name[locale]} : {percent}
                      </span>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                strokeOpacity={0}
                data={data[dataType]}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data[dataType].map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col {...wrapperCol}>
          <List
            bordered
            dataSource={data[dataType]}
            renderItem={(item, index) => {
              const total = data[dataType]
                .map((d) => d.value)
                .reduce((a, b) => a + b);
              const percent = ((item.value / total) * 100).toFixed(2) + "%";
              return (
                <List.Item>
                  <Badge color={COLORS[index]} />
                  <span>{item.name[locale]}</span> | <span>{item.value}</span>
                  <span>$ {percent}</span>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SalePercent;
