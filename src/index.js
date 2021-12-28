import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NobelApp } from "./components/NobelApp";
import { Father } from "./components/Father";
import { Me } from "./components/Me";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <NobelApp />,

  rootElement
);
