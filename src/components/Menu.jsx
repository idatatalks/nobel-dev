import { Grid } from "@mui/material";
import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import SliderYear from "./SliderYear";

export const Menu = (props) => {
  const { data, onSetFilter } = props;

  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      sx={{
        width: "100%",
        border: "2px solid red",
        padding: 0,
        margin: 0,
      }}
    >
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        xl={2}
        sx={{
          width: "100%",
          border: "2px solid green",
          padding: 0,
          margin: 0,
        }}
      >
        <CategoryFilter
          data={data}
          label={"Category"}
          options={data.options.categories}
          defaultOptions={data.filters.category}
          onSetFilter={onSetFilter}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
        <CategoryFilter
          data={data}
          label={"Gender"}
          options={data.options.genders}
          defaultOptions={data.filters.gender}
          onSetFilter={onSetFilter}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
        <CategoryFilter
          data={data}
          label={"Country"}
          options={data.options.countries}
          defaultOptions={data.filters.country}
          onSetFilter={onSetFilter}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{ paddingTop: 0, marginTop: -2 }}
      >
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
