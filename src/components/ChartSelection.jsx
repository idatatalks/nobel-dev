import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function ChartSelection({ selection, onSetSelection }) {
  const handleSelection = (event, newSelection) => {
    onSetSelection(newSelection);
  };

  return (
    <div style={{ border: "2px solid green", textAlign:'center' }}>
      <ToggleButtonGroup
        color="primary"
        value={selection}
        exclusive
        onChange={handleSelection}
      >
        <ToggleButton value="BarChart">BarChart</ToggleButton>
        <ToggleButton value="ScatterChart">ScatterChart</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
