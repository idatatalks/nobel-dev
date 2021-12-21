import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function ChartSelection({ selection, onSetSelection }) {
  const list = [
    { value: "TotalWinnersByCountry", text: "Total Winners By Country" },
    { value: "WinnersByCategory", text: "Winners By Category" },
    { value: "WinnersByYear", text: "Winners By Year" },
    { value: "WinnersByTable", text: "Winners By Table" },
  ];
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
        {list.map((item, index) => (
          <ToggleButton
            key={index}
            value={item.value}
            sx={{ textTransform: "none" }}
          >
            {item.text}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
