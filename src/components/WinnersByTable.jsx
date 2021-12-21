import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "XGrid", col2: "is Awesome" },
//   { id: 3, col1: "Material-UI", col2: "is Amazing" },
//   { id: 4, col1: "Hello", col2: "World" },
//   { id: 5, col1: "XGrid", col2: "is Awesome" },
//   { id: 6, col1: "Material-UI", col2: "is Amazing" },
// ];

// const columns = [
//   { field: "id", hide: true },
//   { field: "col1", headerName: "Column 1", width: 150 },
//   { field: "col2", headerName: "Column 2", width: 150 },
// ];

export function WinnersByTable({ data }) {
  console.log("WinnersByTable:", data);
  const rows = data.map((d, i) => {
    d.id = i;
    return d;
  });
  console.log("WinnersByTable:", data[0]);
  const columns = Object.entries(data[0]).map((d) => {
    return d[0] == "id"
      ? { field: d[0], hide: true }
      : { field: d[0], headerName: d[0], width: 150, fluid: 1 };
  });

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
