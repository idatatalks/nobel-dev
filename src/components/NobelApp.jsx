import { useEffect, useState, Fragment } from "react";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { NobelFilter } from "./NobelFilter";
import { fetchData, buildData, updateDataByFilter } from "../dataUtil";
import * as d3 from "d3";
import { NobelViz } from "./NobelViz";
import { NobelLineChart } from "./NobelLineChart";
import { Menu } from "./Menu";

const dataURL =
  "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";
// const dataURL =
//   "https://gist.githubusercontent.com/idatatalks/823208b5cd51f2030519284b97f1119f/raw/b971e8eb0a04d15c4b4ca25b7a81a26f9a659613/example";

export const NobelApp = (props) => {
  const [{ data, isDataLoaded }, setData] = useState({
    data: null,
    isDataLoaded: false,
  });
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
    const tmpData = updateDataByFilter(data, filters);
    setData({ data: { ...tmpData }, isDataLoaded: true });
  };

  console.log("rendering!");
  if (!isDataLoaded) {
    return <h1>Loading data, please be patient or try again!</h1>;
  }
  console.log("FFF:", data);
  return (
    <>
      <Menu data={data} onSetFilter={handleFilterChange} />
      <NobelViz data={data.filteredData} isDataLoaded={isDataLoaded}></NobelViz>
      {/* <NobelFilter
        data={data}
        category={data.categories}
        gender={data.genders}
        countries={data.countries}
      ></NobelFilter> */}
    </>
  );
};
