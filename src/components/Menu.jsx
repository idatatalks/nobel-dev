import { Grid } from "@mui/material";
import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import SliderYear from "./SliderYear";

export const Menu = (props) => {
  const { data, onSetFilter } = props;

  return (
    <Grid
      container
      direction="row"
      columnSpacing={2}
      rowSpacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={2}>
        <CategoryFilter
          data={data}
          label={"Category"}
          options={data.options.categories}
          defaultOptions={data.filters.category}
          onSetFilter={onSetFilter}
        />
      </Grid>
      {/* <Grid item xs>
        <CategoryFilter
          data={data}
          label={"Gender"}
          options={data.options.genders}
          defaultOptions={data.filters.gender}
          onSetFilter={onSetFilter}
        />
      </Grid>
      <Grid item xs>
        <CategoryFilter
          data={data}
          label={"Country"}
          options={data.options.countries}
          defaultOptions={data.filters.country}
          onSetFilter={onSetFilter}
        />
      </Grid> */}
      <Grid item xs={6}>
        <SliderYear
          data={data}
          range={data.filters.year}
          min={data.options.years[0]}
          max={data.options.years.at(-1)}
          onSetFilter={onSetFilter}
        />
      </Grid>
    </Grid>
  );
};
