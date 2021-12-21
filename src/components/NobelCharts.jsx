import { Grid } from "@mui/material";
import { NobelBarChart } from "./NobelBarChart";
import { NobelPieChart } from "./NobelPieChart";
import { NobelScatter } from "./NobelScatter";
import { NobelPerYear } from "./NobelPerYear";
import { WinnerNumByYear } from "./WinnerNumByYear";
import { WinnersByTable } from "./WinnersByTable";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { getNobelNumPerCountry, getDataByRadio } from "../dataUtil";
import { useMemo } from "react";

const buildScatter = (data) => {
  console.log("build ScatterChart:", data);
  return (
    <Grid item width={"100%"}>
      <NobelPerYear data={data} />
    </Grid>
  );
};

const buildBarchartAndPieChart = (data) => {
  console.log("build barchartData:", data);
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
};

const buildAreaChart = (data) => {
  console.log("build AreaChart");
  return (
    <Grid item width={"100%"}>
      <WinnerNumByYear data={data} />
    </Grid>
  );
};

const buildTableChart = (data) => {
  console.log("build buildTableChart");
  return (
    <Grid item width={"100%"}>
      <WinnersByTable data={data} />
    </Grid>
  );
};

export const NobelCharts = ({ data, selectedChart }) => {
  console.log("DDD:", data);
  // const scatterData = buildScatterData(data);
  const nobelChart = () => {
    console.log("inside nobel chart:", data);
    const scatterData = useMemo(() => buildScatter(data), [data]);
    const barchartData = useMemo(() => buildBarchartAndPieChart(data), [data]);
    const areachartData = useMemo(() => buildAreaChart(data), [data]);
    const tablechartData = useMemo(() => buildTableChart(data), [data]);

    if (selectedChart == "WinnersByCategory") {
      return scatterData;
    } else if (selectedChart == "TotalWinnersByCountry") {
      return barchartData;
    } else if (selectedChart == "WinnersByYear") {
      return areachartData;
    } else if (selectedChart == "WinnersByTable") {
      return tablechartData;
    }
  };

  // const refinedNobelChart = useMemo(() => nobelChart(data), [data]);
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
