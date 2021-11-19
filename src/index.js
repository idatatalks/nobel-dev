import { Grid } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Line, LineChart } from "recharts";
import App from "./App";
import { NobelApp } from "./components/NobelApp";
import { NobelLineChart } from "./components/NobelLineChart";
import { NobelScatter } from "./components/NobelScatter";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    {/* <NobelLineChart /> */}
    <App />
    <NobelApp />
  </StrictMode>,
  rootElement
);
