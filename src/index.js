import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NobelApp } from "./components/NobelApp";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <NobelApp />,

  rootElement
);
