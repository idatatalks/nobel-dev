import { Grid, Box } from "@mui/material";
import GroupCheckBox from "./GroupCheckBox";
import SliderYear from "./SliderYear";

export const NobelFilter = (props) => {
  const { data, category, gender, countries } = props;
  return (
    <Box width="80%">
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
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
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <GroupCheckBox
          legend={"Country"}
          options={data.countries}
          defaultOptions={data.countries
            .slice(0, 10)
            .concat(["China", "India"])}
        />
      </Grid> */}
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <SliderYear min={1960} max={2021} />
        </Grid>
      </Grid>
    </Box>
  );
};
