import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function ChartSelection({ selection, onSetSelection }) {
  const handleSelection = (event, newSelection) => {
    onSetSelection(newSelection);
  };

  return (
    <div style={{ border: "2px solid green", textAlign: "center" }}>
      <ToggleButtonGroup
        color="primary"
        value={selection}
        exclusive
        onChange={handleSelection}
        sx={{ textTransform: "none" }}
      >
        <ToggleButton
          value="TotalWinnersByCountry"
          sx={{ textTransform: "none" }}
        >
          Total Winners By Country
        </ToggleButton>
        <ToggleButton value="WinnersByCategory" sx={{ textTransform: "none" }}>
          Winners By Category
        </ToggleButton>
        <ToggleButton value="WinnersByYear" sx={{ textTransform: "none" }}>
          Winners By Year
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
