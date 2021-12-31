import * as React from "react";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const chartList = [
  { value: "WinnersByCountry", text: "Winners By Country" },
  { value: "WinnersByCategory", text: "Winners By Category" },
  { value: "WinnersByYear", text: "Winners By Year" },
  { value: "WinnersByTable", text: "Winners By Table" },
];

function MenuCharts({ selection, onSetSelection }) {
  console.log("MenuCharts render");
  const handleSelection = (event, newSelection) => {
    console.log("handleSelection newSelection:", newSelection);
    if (newSelection) onSetSelection(newSelection);
  };

  return (
    <div
      style={{ border: "2px solid green", textAlign: "center", marginTop: 10 }}
    >
      <ToggleButtonGroup
        color="primary"
        value={selection}
        exclusive
        onChange={handleSelection}
        sx={{
          textTransform: "none",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {chartList.map((item, index) => (
          <ToggleButton
            key={index}
            value={item.value}
            sx={{ textTransform: "none", fontSize: "large" }}
          >
            {item.text}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default React.memo(MenuCharts);
