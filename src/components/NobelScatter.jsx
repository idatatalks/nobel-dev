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
import { Box, StyledEngineProvider, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

const FlexText = styled("div")({
  width: { md: 300, lg: 600 },
  fontSize: { md: 16, lg: 30 },
  color: { md: "red", lg: "green" },
});

export const NobelScatter = (props) => {
  const [{ data, isDataMangled }, setData] = useState({
    data: null,
    isDataMangled: false,
  });

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

  const filterData = () => {
    const data = props.data;
    console.log(data);
    const filteredData = d3
      .flatGroup(data, (d) => d.country)
      .map((d, i) => {
        return d[1].map((d, j) => {
          d.winnerId = j + 1;
          d.winnerY = d.winnerId * mark.height;
          d.countryId = i + 1;
          return d;
        });
      })
      .flat();

    filteredData.winnerNum = (() => {
      return d3
        .flatGroup(data, (d) => d.country)
        .map(([key, value]) => {
          return [key, value.length];
        });
    })();

    filteredData.maxWinners = (() => {
      let index = d3.maxIndex(filteredData.winnerNum, (d) => d[1]);
      return [
        filteredData.winnerNum[index][0],
        filteredData.winnerNum[index][1],
      ];
    })();
    console.log("xxx:", filteredData.maxWinners);
    filteredData.countryNum = filteredData.at(-1).countryId;
    filteredData.countries = Array.from(
      d3.group(data, (d) => d.country).keys()
    );
    console.log("Country numbers:", filteredData.countryNum);
    console.log("Country names:", filteredData.countries.length);
    console.log("filtered data:", filteredData);

    setData({ data: filteredData, isDataMangled: true });
    return filteredData;
  };
  const xTickNum = () => {};

  useEffect(() => {
    filterData();
  }, []);

  if (!isDataMangled) {
    console.log("Data is NOT processed yet.");
    return "";
  }

  const chartWidth = () =>
    mark.width * 2 * data.countries.length +
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

  return (
    <div
      className="ScatterPlot"
      style={{ overflow: "auto", width: 600, height: 400 }}
    >
      {/* <FlexText
        sx={{
          width: { md: 300, lg: 600 },
          fontSize: { md: 16, lg: 30 },
          color: { md: "red", lg: "green" },
        }}
      >
        Hello world
      </FlexText>
      */}
      <ResponsiveContainer width={chartWidth()} height={chartHeight()}>
        <ScatterChart margin={margins}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey="countryId"
            type="number"
            name="country"
            tick={<CustomizedAxisTick data={data} />}
            data={data}
            angle={90}
            dx={-50}
            interval={0}
            padding={horPaddings}
            allowDataOverflow={false}
            tickCount={data.countries.length}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis
            dataKey="winnerId"
            type="number"
            name="number"
            domain={["auto", "dataMax"]}
            dy={0}
            padding={vertPaddings}
            interval={0}
            tickCount={data.maxWinners[1]}
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
            data={data}
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
        {data.countries[payload.value - 1]}
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
