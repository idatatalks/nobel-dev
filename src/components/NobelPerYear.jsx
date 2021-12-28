import { useEffect, useState } from "react";
import React from "react";
import * as d3 from "d3";
import { COLOR_PALETTE } from "../dataUtil";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  Cell,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Brush,
} from "recharts";

const buildData = (data) => {
  const sortedData = [...data].sort(
    (a, b) =>
      d3.ascending(a.year, b.year) || d3.ascending(a.category, b.category)
  );
  console.log("XXXXX dataPerYear1:", sortedData);
  console.log("XXXXX dataPerYear1:", data);
  const dataPerYear = d3.flatGroup(sortedData, (d) => d.year);

  dataPerYear.forEach(([year, data]) => {
    //   console.log("yyyy:", year, " data:", data);
    data.forEach((d, i) => {
      d.index = i + 1;
    });
  });
  console.log("XXXXX sorted category:", data.categories.slice().sort());
  sortedData.maxWinners = d3.max(dataPerYear, (d) => d[1].length);
  sortedData.yearNum =
    sortedData[sortedData.length - 1].year - sortedData[0].year + 1;
  console.log("XXXXX dataPerYear2:", dataPerYear);
  console.log("XXXXX sorted data:", sortedData);
  return [sortedData, data.categories.slice().sort()];
};

const NobelPerYear = (props) => {
  console.log("NobelPerYear render!");
  const { data } = props;
  const [dataPerYear, categories] = buildData(data);

  const mark = {
    size: 10,
    width: 10,
    height: 15,
  };

  const horizontalGap = 10;
  const margins = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 0,
  };
  const horPaddings = { left: 10, right: 20 };
  const vertPaddings = { top: 10, bottom: 10 };

  const chartHeight =
    mark.height * 1.2 * dataPerYear.maxWinners +
    margins.top +
    margins.bottom +
    vertPaddings.top +
    vertPaddings.bottom;

  const xAxisWidth =
    dataPerYear.yearNum * 20 +
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
      <ScatterChart
        style={{ border: "2px solid green" }}
        margin={margins}
        width={xAxisWidth}
        height={chartHeight}
        minHeight={400}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDuplicatedCategory={false}
          dataKey={"year"}
          type={"number"}
          name={"year"}
          domain={["dataMin", "dataMax"]}
          interval={0}
          tickCount={dataPerYear.yearNum / 2 + 1}
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
        <YAxis
          dataKey={"index"}
          type={"number"}
          name={"WinnerCount"}
          interval={0}
          tickCount={dataPerYear.maxWinners}
          domain={["dataMin", "dataMax+2"]}
          padding={vertPaddings}
        />
        <ZAxis type="number" range={[100, 100]} />
        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {/* <Brush dataKey="year" height={30} stroke="#8884d8" /> */}
        <Scatter
          shape="circle"
          legendType="triangle"
          name="Nobel winners per year"
          data={dataPerYear}
          fill="#8884d8"
        >
          {dataPerYear.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={((entry) => {
                let index = categories.indexOf(entry.category);
                console.log("YYY: index:", index, ",entry:", entry);
                return COLOR_PALETTE[index % COLOR_PALETTE.length];
              })(entry)}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </div>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload, data, index } = props;
  // console.log("YYY:", props);
  // const xlabels = Array.from(data.countries);
  // console.log(xlabels);
  // console.log(payload.value - 1, xlabels[payload.value - 1]);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-5}
        dy={0}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomizedScatterShape = (props) => {
  const { x, y, winnerId, winnerY, countryId, interval, payload } = props;
  // console.log("YYY:", props);
  const r = mark.size / 2;
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={r} cy={r} r={r} fill="orange" />
    </g>
  );
};

const CustomizedScatterCell = (entry, index) => {
  console.log("YYY: entry:", entry);
  console.log("YYY: index:", index);
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
};

export default React.memo(NobelPerYear);
{
  /* <ScatterChart margin={margins}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDuplicatedCategory={false}
          dataKey={"year"}
          type={"number"}
          name={"year"}
          data={dataPerYear}
          angle={90}
          dx={-50}
          interval={0}
          padding={horPaddings}
          allowDataOverflow={false}
          tickCount={dataPerYear.length}
          tick={<CustomizedAxisTick data={dataPerYear} />}
          domain={["dataMin", "dataMax"]}
        />
        <YAxis
          dataKey={"winnerId"}
          type={"number"}
          name={"WinnerCount"}
          domain={["auto", "dataMax"]}
          dy={0}
          padding={vertPaddings}
          interval={0}
          tickCount={dataPerYear.maxWinners}
          fontSize={10}
          // domain={["dataMin-10", "dataMax+10"]}
        />
        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          shape="cross"
          legendType="triangle"
          dx={10}
          dy={10}
          name="Nobel winners per year"
          data={dataPerYear}
          fill="#8884d8"
          shape={<CustomizedScatterShape />}
        />
      </ScatterChart> */
}
