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

const CustomizedAxisTick = (props) => {
  const { x, y, payload, data } = props;
  console.log(props);
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
  const { x, y, index, payload } = props;
  return (
    <g transform={`translate(${x},${y - index})`}>
      <circle cx={5} cy={5} r={5} fill="orange" />
    </g>
  );
};

export const NobelScatter = (props) => {
  const [{ data, isDataMangled }, setData] = useState({
    data: null,
    isDataMangled: false,
  });

  const shapeProps = {
    size: 5,
  };

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

    filteredData.forEach((d) => (d.index *= 2 * shapeProps.size));
    filteredData.countryNum = filteredData[filteredData.length - 1].id;
    filteredData.countries = Array.from(
      d3.group(data, (d) => d.country).keys()
    );
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
    <div className="ScatterPlot">
      <ResponsiveContainer width="100%" aspect={4 / 3}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 80, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey="id"
            type="number"
            name="country"
            tick={<CustomizedAxisTick data={data} />}
            data={data}
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
            domain={["auto", "dataMax"]}
            dy={-20}
            interval={0}
            tickCount={10}
            // domain={["dataMin-10", "dataMax+10"]}
          />
          {/* <ZAxis dataKey="year" range={[64, 144]} name="year" /> */}
          <Legend verticalAlign="top" margin={{ bottom: 100 }} />
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
