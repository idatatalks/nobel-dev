import { Grid } from "@mui/material";
import { NobelBarChart } from "./NobelBarChart";
import { NobelPieChart } from "./NobelPieChart";
import { NobelScatter } from "./NobelScatter";
import { NobelPerYear } from "./NobelPerYear";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { getNobelNumPerCountry, getDataByRadio } from "../dataUtil";
export const NobelCharts = ({ data, selectedChart }) => {
  console.log("DDD:", data);
  // const scatterData = buildScatterData(data);
  const nobelChart = () => {
    if (selectedChart == "ScatterChart") {
      console.log("ScatterChart:", data);
      return (
        <Grid item width={"100%"}>
          <NobelPerYear data={data} />
        </Grid>
      );
    } else if (selectedChart == "BarChart") {
      console.log("barchartData:", data);
      return (
        <>
          <Grid item width={"75%"}>
            <NobelBarChart
              data={data}
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
              data={data}
              dataKey={"radio"}
              beginYear={data.year[0]}
              endYear={data.year[1]}
            ></NobelPieChart>
          </Grid>
        </>
      );
    }
  };
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
      {nobelChart()}
    </Grid>
  );
};
