import { Tooltip } from "@mui/material";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";

export const NobelScatter = (props) => {
  const [data, setData] = useState(props.data);

  const filterTop5 = () => {
    const filteredData = data.map((e) => {
      return { country: e.country, year: e.year };
    });
    console.log("filtered data:", filteredData);
    return filteredData;
  };

  return (
    <ScatterChart
      width={600}
      height={350}
      margin={{ top: 2, right: 20, bottom: 10, left: 30 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="country" name="country" />
      <YAxis dataKey="year" name="year" domain={["dataMin", "dataMax"]} />
      <ZAxis dataKey="year" range={[64, 144]} name="year" />
      <Legend />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter
        name="Top 5 Nobel Countries"
        data={filterTop5()}
        fill="#8884d8"
      />
    </ScatterChart>
  );
};
