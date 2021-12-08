import { Grid } from "@mui/material";
import { NobelBarChart } from "./NobelBarChart";

export const NobelCharts = ({ data }) => {
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
          data={data}
          xDataKey={"country"}
          xDataType={"category"}
          barDataKey={"number"}
          barDataType={"number"}
        />
      </Grid>
    </Grid>
  );
};
