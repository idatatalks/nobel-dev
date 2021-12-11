import { Grid } from "@mui/material";
import { NobelBarChart } from "./NobelBarChart";
import { NobelPieChart } from "./NobelPieChart";
import { NobelScatter } from "./NobelScatter";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { getNobelNumPerCountry, getDataByRadio } from "../dataUtil";
export const NobelCharts = ({ data }) => {
  console.log("DDD:", data);
  const barchartData = getNobelNumPerCountry(data);
  console.log("barchartData:", barchartData);
  return (
    <Grid
      container
      direction="row"
      columnSpacing={2}
      rowSpacing={2}
      justifyContent="center"
      alignItems="center"
      wrap="wrap"
      marginTop={2}
    >
      <Grid item width={"100%"}>
        <NobelScatter
          data={data}
          xAxisConf={{
            data: { data },
            dataKey: "countryId",
            type: "number",
            name: "country",
            tickCount: data.countryNum,
          }}
          yAxisConf={{
            dataKey: "winnerId",
            type: "number",
            name: "number",
            tickCount: data.maxWinners[1],
          }}
          scatter={{
            legendType: "triangle",
            name: "Nobel Winners",
            data: { data },
          }}
        ></NobelScatter>
      </Grid>
      <Grid item width={"75%"}>
        <NobelBarChart
          data={barchartData}
          xDataKey={"countryId"}
          xDataType={"number"}
          barDataKey={"number"}
          barDataType={"number"}
          beginYear={data.year[0]}
          endYear={data.year[1]}
        />
      </Grid>
      <Grid item width={"25%"}>
        <NobelPieChart
          data={getDataByRadio(barchartData)}
          dataKey={"radio"}
          beginYear={data.year[0]}
          endYear={data.year[1]}
        ></NobelPieChart>
      </Grid>
    </Grid>
  );
};
