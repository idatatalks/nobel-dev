import { useState } from "react";
import { Paper, Slider } from "@mui/material";

export default function SliderYear(props) {
  const { range, onSetFilter, data, min, max } = props;
  // const [yearRange, updateYearRange] = useState([min, max]);
  const handleSliderChange = (event, newValue) => {
    console.log(newValue);
    // updateYearRange(newValue);
    onSetFilter({ ...data.filters, year: newValue });
  };
  return (
    <Paper
      elevation={10}
      sx={{
        textAlign: "center",
        margin: "auto",
        p: 5,
      }}
    >
      <Slider
        defaultValue={range}
        value={range}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        min={min}
        max={max}
        step={1}
        marks
        // sx={{ m: 5 }}
      ></Slider>
    </Paper>
  );
}
