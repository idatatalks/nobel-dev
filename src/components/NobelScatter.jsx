import { useState } from "react";
import React, { FunctionComponent } from "react";
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

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
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
  const [data, setData] = useState(props.data);

  const filterTop5 = () => {
    console.log(data);
    // const filteredData = d3.rollup(
    //   data,
    //   (v) => {
    //     // console.log(v.length);
    //     return v.length;
    //   },
    //   (d) => d.country
    // );
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

    console.log("filtered data:", filteredData);
    return filteredData;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ScatterChart
        width={600}
        height={350}
        margin={{ top: -20, right: 20, bottom: 10, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDuplicatedCategory={false}
          dataKey="country"
          type="category"
          name="country"
          tick={CustomizedAxisTick}
          angle="90"
        />
        <YAxis
          dataKey="index"
          type="number"
          name="number"
          domain={["dataMin-10", "dataMax+10"]}
        />
        {/* <ZAxis dataKey="year" range={[64, 144]} name="year" /> */}
        <Legend />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          name="Top 5 Nobel Countries"
          data={filterTop5()}
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
