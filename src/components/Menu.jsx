import { Grid } from "@mui/material";
import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import SliderYear from "./SliderYear";

export const Menu = ({ data, onSetFilter }) => {
  const commonConfig = {
    data,
    onSetFilter,
    sx: { width: "100%", maxWidth: "100%" },
  };

  return (
    <Grid
      container
      direction="row"
      columnSpacing={2}
      rowSpacing={1}
      justifyContent="center"
      alignItems="center"
      wrap="wrap"
    >
      <Grid
        item
        xs={8}
        sm={4}
        md={4}
        lg={2}
        xl={2}
        sx={{ border: "2px solid red" }}
      >
        <CategoryFilter
          {...{
            ...commonConfig,
            label: "Category",
            options: data.options.categories,
            defaultOptions: data.filters.category,
          }}
        />
      </Grid>
      <Grid
        item
        xs={4}
        sm={2}
        md={2}
        lg={1}
        xl={1}
        sx={{ border: "2px solid red" }}
      >
        <CategoryFilter
          {...{
            ...commonConfig,
            label: "Gender",
            options: data.options.genders,
            defaultOptions: data.filters.gender,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={3}
        xl={3}
        sx={{ border: "2px solid red" }}
      >
        <CategoryFilter
          {...{
            ...commonConfig,
            label: "Country",
            options: data.options.countries,
            defaultOptions: data.filters.country,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={10}
        lg={6}
        xl={6}
        sx={{ border: "2px solid red" }}
      >
        <SliderYear
          {...{
            ...commonConfig,
            range: data.filters.year,
            min: data.options.years[0],
            max: data.options.years.at(-1),
          }}
        />
      </Grid>
    </Grid>
  );
};
