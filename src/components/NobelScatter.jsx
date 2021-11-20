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
  ZAxis
} from "recharts";

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-10}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const NobelScatter = (props) => {
  const [{ data, isDataMangled }, setData] = useState({
    data: null,
    isDataMangled: false
  });

  const filterTop5 = () => {
    const data = props.data;
    console.log(data);
    const filteredData = d3
      .flatGroup(data, (d) => d.country)
      .map((d, id) => {
        return d[1].map((d, i) => {
          d.index = i + 1;
          d.id = id + 1;
          return d;
        });
      })
      .flat();

    filteredData.countryNum = filteredData[filteredData.length - 1].id;
    filteredData.countries = d3.group(data, (d) => d.country);
    console.log("Country numbers:", filteredData.countryNum);
    console.log("Country names:", filteredData.countries);
    console.log("filtered data:", filteredData);
    setData({ data: filteredData, isDataMangled: true });
    return filteredData;
  };
  const xTickNum = () => {};
  useEffect(() => {
    filterTop5();
  }, []);

  if (!isDataMangled) {
    console.log("Data is NOT processed yet.");
    return "";
  }

  return (
    <ResponsiveContainer width="100%" height={600}>
      <ScatterChart
        width={600}
        height={350}
        margin={{ top: 20, right: 20, bottom: 10, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDuplicatedCategory={false}
          dataKey="id"
          type="number"
          name="country"
          tick={CustomizedAxisTick}
          angle="-90"
          dx={10}
          interval={0}
          allowDataOverflow={false}
          tickCount={data.countryNum}
          domain={["dataMin", "dataMax"]}
        />
        <YAxis
          dataKey="index"
          type="number"
          name="number"
          domain={["auto", "auto"]}
          dy={-20}
          interval={0}
          tickCount={10}
          // domain={["dataMin-10", "dataMax+10"]}
        />
        {/* <ZAxis dataKey="year" range={[64, 144]} name="year" /> */}
        <Legend verticalAlign="top" margin={{ bottom: 100 }} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Top 5 Nobel Countries" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
