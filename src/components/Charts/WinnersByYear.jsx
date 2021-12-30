import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { COLOR_PALETTE } from "../../dataUtil";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
} from "recharts";
import * as d3 from "d3";

const buildData = (data) => {
  const countries = data.winnersByCountry.map((d) => d[0]);
  console.log("XXXXX country:", countries);
  console.log("XXXXX data:", data);
  let sortedData = d3
    .flatRollup(
      [...data],
      (v) => v.length,
      (d) => d.year,
      (d) => d.country
    )
    .sort((a, b) => d3.ascending(a[0], b[0]) || d3.ascending(a[1], b[1]));

  sortedData = d3
    .flatGroup(sortedData, (d) => d[0])
    .map((d) => [d[0], d[1].map((d) => [d[1], d[2]])]);
  console.log("XXXXX sortedData1:", sortedData);

  sortedData = sortedData.map((d) => {
    const o = { year: d[0] };
    countries.forEach((c) => {
      const obj = Object.fromEntries(d[1]);
      // console.log("XXXX: obj:", obj);
      obj.hasOwnProperty(c) ? (o[c] = obj[c]) : (o[c] = 0);
    });
    return o;
  });
  console.log("XXXXX sortedData2:", sortedData);
  sortedData.countries = countries;
  sortedData.yearNum =
    sortedData[sortedData.length - 1].year - sortedData[0].year + 1;
  console.log("XXXXX sorted data:", sortedData);
  return sortedData;
};

const WinnersByYear = ({ data }) => {
  console.log("WinnersByYear render, data:", data);
  data = buildData(data);

  const horizontalGap = 10;
  const margins = {
    top: 20,
    right: 100,
    bottom: 30,
    left: 30,
  };
  const horPaddings = { left: 10, right: 20 };
  const vertPaddings = { top: 10, bottom: 10 };

  const chartHeight =
    400 + margins.top + margins.bottom + vertPaddings.top + vertPaddings.bottom;

  const xAxisWidth =
    data.yearNum * 20 +
    horPaddings.left +
    horPaddings.right +
    margins.left +
    margins.right;

  console.log("XXX Chart height:", chartHeight);
  console.log("XXX xAxisWidth:", xAxisWidth);

  return (
    <div
      style={{
        width: "100%",
        height: chartHeight + 20,
        border: "2px solid black",
        overflow: "auto",
      }}
    >
      <AreaChart
        data={data}
        style={{ border: "2px solid green" }}
        margin={margins}
        width={xAxisWidth}
        height={chartHeight}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDuplicatedCategory={false}
          dataKey={"year"}
          type={"number"}
          name={"year"}
          domain={["dataMin", "dataMax"]}
          interval={0}
          tickCount={data.yearNum / 2 + 1}
          angle={-90}
          minTickGap={20}
          tickMargin={25}
          padding={horPaddings}
          tick={{
            textAnchor: "middle",
            verticalAnchor: "end",
            stroke: "red",
            dx: -3,
          }}
          allowDataOverflow={true}
        />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#f7efd2",
            borderRadius: 10,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          content={<CustomTooltip />}
          allowEscapeViewBox={{ x: false, y: false }}
        />
        <Legend
          layout="horizontal"
          align="left"
          verticalAlign="top"
          iconType="rect"
          wrapperStyle={{
            paddingLeft: 60,
            paddingBottom: 10,
            border: "2px solid green",
            width: "50%",
          }}
        />
        {data.countries.map((c, i) => (
          <Area
            key={i}
            type="step"
            dataKey={c}
            stackId="1"
            stroke={COLOR_PALETTE[i % COLOR_PALETTE.length]}
            fill={COLOR_PALETTE[i % COLOR_PALETTE.length]}
          />
        ))}
      </AreaChart>
    </div>
  );
};

const CustomTooltip = (props) => {
  const { active, payload, label, contentStyle } = props;
  console.log("Area tooltop:", props);

  if (active && payload && payload.length) {
    payload.filter((d) => d.value > 0);

    return (
      <div style={{ ...contentStyle }}>
        <p>{`Year:${label}`}</p>
        {payload
          .sort((a, b) => b.value - a.value)
          .filter((d) => d.value > 0)
          .map((d, i) => {
            return (
              <p
                key={i}
                style={{ color: d.fill }}
              >{`${d.dataKey}:${d.value}`}</p>
            );
          })}
      </div>
    );
  }

  return null;
};

export default React.memo(WinnersByYear);
