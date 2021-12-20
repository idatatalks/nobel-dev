import { useState } from "react";
import { Button } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import * as d3 from "d3";

const buildData = (data) => {
  const countries = [...d3.group(data, (d) => d.country).keys()];
  console.log("XXXXX country:", countries);
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

export const WinnerNumByYear = ({ data }) => {
  console.log("WinnerNumByYear render, data:", data);
  data = buildData(data);

  const horizontalGap = 10;
  const margins = {
    top: 20,
    right: 20,
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
      <ResponsiveContainer
        width={"100%"}
        minWidth={1000}
        style={{ overflow: "auto" }}
        wrapperStyle={{ overflow: "auto" }}
        height={chartHeight}
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
          <Tooltip />
          {data.countries.map((c) => (
            <Area
              type="monotone"
              dataKey={c}
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
