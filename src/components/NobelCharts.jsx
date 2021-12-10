import { Grid } from "@mui/material";
import { NobelBarChart } from "./NobelBarChart";
import { NobelPieChart } from "./NobelPieChart";
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
        ></NobelPieChart>
        {/* <ResponsiveContainer width={"100%"} height={400}>
          <PieChart>
            <Pie
              data={barchartData}
              dataKey={"number"}
              cx={120}
              cy={150}
              outerRadius={70}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer> */}
      </Grid>
    </Grid>
  );
};
