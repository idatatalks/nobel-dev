import { Grid } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FilterCategory from "./components/FilterCategory";
import GroupCheckBox from "./components/GroupCheckBox";
import SliderYear from "./components/SliderYear";

const category = ["Physics", "Chemistry", "Peace", "Literature", "Biology"];
const gender = ["Male", "Female"];
const countries = ["USA", "China"];
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
    <Grid container>
      <Grid item>
        <GroupCheckBox options={category} legend={"Category"} />
      </Grid>
      <Grid item>
        <GroupCheckBox options={gender} legend={"Gender"} />
      </Grid>
      <Grid item>
        <GroupCheckBox options={countries} legend={"Country"} />
      </Grid>
      <Grid item>
        <SliderYear min={1960} max={2021} />
      </Grid>
    </Grid>
  </StrictMode>,
  rootElement
);
