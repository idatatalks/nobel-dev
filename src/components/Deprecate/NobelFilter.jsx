import { Grid, Box } from "@mui/material";
import GroupCheckBox from "../GroupCheckBox";
import FilterSlide from "./FilterSlide";

export const NobelFilter = (props) => {
  const { data, category, gender, countries } = props;
  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid green",
        paddingRight: 0,
        marginRight: 0,
      }}
      xs={{ width: "80%" }}
      sm={{ width: "80%" }}
      md={{ width: "80%" }}
    >
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        sx={{
          width: "100%",
          border: "2px solid red",
          paddingRight: 0,
          marginRight: 0,
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <GroupCheckBox
            legend={"Category"}
            options={data.categories}
            defaultOptions={data.categories}
          />
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <GroupCheckBox
            legend={"Gender"}
            options={data.genders}
            defaultOptions={data.genders}
          />
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <GroupCheckBox
            legend={"Country"}
            options={data.countries}
            defaultOptions={data.countries
              .slice(0, 10)
              .concat(["China", "India"])}
          />
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <FilterSlide min={1960} max={2021} />
        </Grid>
      </Grid>
    </Box>
  );
};
