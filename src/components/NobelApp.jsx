import { useEffect, useState, Fragment } from "react";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { NobelFilter } from "./NobelFilter";
import {
  fetchData,
  buildData,
  filterDataBySelection,
  getNobelNumPerCountry,
} from "../dataUtil";
import * as d3 from "d3";
import { NobelViz } from "./NobelViz";
import { NobelLineChart } from "./NobelLineChart";
import { Menu } from "./Menu";
import { NobelCharts } from "./NobelCharts";
import { ChartSelection } from "./ChartSelection";

const dataURL =
  "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";

export const NobelApp = (props) => {
  const [{ data, isDataLoaded }, setData] = useState({
    data: null,
    isDataLoaded: false,
  });
  const [chart, setChart] = useState("TotalWinnersByCountry");
  // const [filter, setFilter] = useState(null);
  // const [isDataLoaded, setisDataLoaded] = useState(false);
  useEffect(() => {
    console.log("first effect start");
    fetchData(dataURL)
      .then((rawData) => {
        console.log("data parse start");
        rawData = d3.csvParse(rawData, d3.autoType);
        const data = buildData(rawData);
        setData({ data, isDataLoaded: true });
        console.log("data parse end!");
      })
      .catch((error) => console.log("out: ", error));
    console.log("first effect end!");
  }, []);

  const handleFilterChange = (filters) => {
    const tmpData = filterDataBySelection(data, filters);
    console.log("PPPP:after filter change:", tmpData);
    setData({ data: { ...tmpData }, isDataLoaded: true });
  };

  const handleChartSelection = (newChart) => {
    console.log("handleChartSelection is clicked on:", newChart);
    setChart(newChart);
  };

  console.log("rendering!");
  if (!isDataLoaded) {
    return <h1>Loading data, please be patient or try again!</h1>;
  }
  console.log("FFF:", data);
  return (
    <>
      <Menu data={data} onSetFilter={handleFilterChange} />
      <ChartSelection selection={chart} onSetSelection={handleChartSelection} />
      <NobelCharts data={data.filteredData} selectedChart={chart} />
      {/* <NobelViz data={data.filteredData} isDataLoaded={isDataLoaded}></NobelViz> */}
      {/* <NobelFilter
        data={data}
        category={data.categories}
        gender={data.genders}
        countries={data.countries}
      ></NobelFilter> */}
    </>
  );
};
