import { Grid } from "@mui/material";
import GroupCheckBox from "./GroupCheckBox";
import SliderYear from "./SliderYear";

export const NobelFilter = (props) => {
  const { category, gender, countries } = props;
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
        <GroupCheckBox
          legend={"Category"}
          options={category}
          defaultOptions={category}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <GroupCheckBox
          legend={"Gender"}
          options={gender}
          defaultOptions={gender}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <GroupCheckBox
          legend={"Country"}
          options={countries}
          defaultOptions={countries}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <SliderYear min={1960} max={2021} />
      </Grid>
    </Grid>
  );
};
