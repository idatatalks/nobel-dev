import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function WinnersByTable({ data }) {
  console.log("WinnersByTable render:", data);
  const rows = data.map((d, i) => {
    d.id = i;
    return d;
  });
  console.log("WinnersByTable:", data[0]);
  const columns = Object.entries(data[0]).map((d) => {
    let o = { field: d[0], headerName: d[0], width: 150, fluid: 1 };
    if (d[0] == "id") {
      o.hide = true;
    }
    if (d[0] == "link") {
      o.renderCell = (params) => {
        console.log("YYYY:", params);
        return (
          <div
            style={{
              overflow: "auto",
              lineHeight: "160%",
              padding: 0,
            }}
          >
            <a href={params.value}>{params.row.name}</a>
          </div>
        );
      };
    } else {
      o.renderCell = (params) => {
        console.log("YYYYY:", params);
        return (
          <div
            style={{
              overflow: "auto",
              lineHeight: "160%",
              padding: 0,
            }}
          >
            {typeof params.value == "object" && params.value != null
              ? params.value.toString()
              : params.value}
          </div>
        );
      };
    }
    return o;
  });

  return (
    <div style={{ height: 480, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  console.log("Render: is data changed:", prevProps == nextProps);
  return prevProps == nextProps;
}

// export default (() => {
//   console.log("Test Memo");
//   return React.memo(WinnersByTable, areEqual);
// })();
export default WinnersByTable;
