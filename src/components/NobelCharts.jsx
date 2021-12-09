import { Grid } from "@mui/material";
import { NobelBarChart } from "./NobelBarChart";
import { getNobelNumPerCountry } from "../dataUtil";
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
    </Grid>
  );
};
