import { useState } from "react";
import { Paper, Slider } from "@mui/material";

export default function SliderYear(props) {
  const [yearRange, updateYearRange] = useState([props.min, props.max]);
  const handleSliderChange = (event, newValue) => {
    console.log(newValue);
    updateYearRange(newValue);
  };
  return (
    <Paper
      elevation={10}
      sx={{
        textAlign: "center",
        margin: "auto",
        p: 5
      }}
    >
      <Slider
        defaultValue={yearRange}
        value={yearRange}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        min={props.min}
        max={props.max}
        step={1}
        marks
        // sx={{ m: 5 }}
      ></Slider>
    </Paper>
  );
}
