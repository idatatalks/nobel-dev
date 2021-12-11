import { useEffect, useState } from "react";
import React from "react";
import * as d3 from "d3";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import "../styles.css";
import {
  Box,
  Slider,
  StyledEngineProvider,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FlexText = styled("div")({
  width: { md: 300, lg: 600 },
  fontSize: { md: 16, lg: 30 },
  color: { md: "red", lg: "green" },
});

export const NobelScatter = (props) => {
  const { data, xAxisConf, yAxisConf, scatter } = props;
  // const [{ data, isDataMangled }, setData] = useState({
  //   data: null,
  //   isDataMangled: false,
  // });

  const matches = useMediaQuery("(min-width:900px)");
  const width = matches ? "100%" : 600;

  const mark = {
    size: 5,
    width: 10,
    height: 10,
  };

  const horizontalGap = 10;
  const margins = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 30,
  };
  const horPaddings = { left: 10, right: 20 };
  const vertPaddings = { top: 10, bottom: 10 };

  const chartWidth = () =>
    mark.width * 2 * data.countryNum +
    margins.left +
    margins.right +
    horPaddings.left +
    horPaddings.right;

  const chartHeight = () =>
    mark.height * 1.2 * data.maxWinners[1] +
    margins.top +
    margins.bottom +
    vertPaddings.top +
    vertPaddings.bottom;

  const yearMarks = [
    { value: data.year[0], label: data.year[0] },
    { value: data.year[1], label: data.year[1] },
  ];

  const [year, updateYear] = useState(
    parseInt(data.year[0] + (data.year[1] - data.year[0]) / 2)
  );

  const dataPerYear = data.filter((d) => d.year == year);
  console.log("XXXX year:", year);
  console.log("XXXX dataPerYear:", dataPerYear);

  if (dataPerYear.length == 0) return "";

  return (
    <div
      className="ScatterPlot"
      style={{ overflow: "auto", width: "100%", height: 400 }}
    >
      <Box sx={{ width: "70%", marginX: 10, marginY: 10 }}>
        <Slider
          aria-label="Always visible"
          defaultValue={2001}
          min={data.year[0]}
          max={data.year[1]}
          step={1}
          marks={yearMarks}
          valueLabelDisplay="on"
        />
      </Box>
      <ResponsiveContainer width={"100%"} height={chartHeight()}>
        <ScatterChart margin={margins}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey={xAxisConf.dataKey}
            type={xAxisConf.type}
            name={xAxisConf.name}
            tick={<CustomizedAxisTick data={dataPerYear} />}
            data={dataPerYear}
            angle={90}
            dx={-50}
            interval={0}
            padding={horPaddings}
            allowDataOverflow={false}
            tickCount={xAxisConf.tickCount}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis
            dataKey={yAxisConf.dataKey}
            type={yAxisConf.type}
            name={yAxisConf.name}
            domain={["auto", "dataMax"]}
            dy={0}
            padding={vertPaddings}
            interval={0}
            tickCount={yAxisConf.tickCount}
            fontSize={10}
            // domain={["dataMin-10", "dataMax+10"]}
          />
          {/* <ZAxis dataKey="year" range={[64, 144]} name="year" /> */}
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            shape="cross"
            legendType="triangle"
            dx={10}
            dy={10}
            name="Top 5 Nobel Countries"
            data={dataPerYear}
            fill="#8884d8"
            shape={<CustomizedScatterShape />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload, data, index } = props;
  console.log("YYY:", props);
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
        {data.winnersByCountry[payload.value - 1][0]}
      </text>
    </g>
  );
};

const CustomizedScatterShape = (props) => {
  const { x, y, winnerId, winnerY, countryId, interval, payload } = props;
  // console.log("YYY:", props);
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={5} cy={5} r={5} fill="orange" />
    </g>
  );
};
