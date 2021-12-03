import { useEffect, useState, Fragment } from "react";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { NobelFilter } from "./NobelFilter";
import { fetchData, parseData, getFilteredData } from "../dataUtil";
import * as d3 from "d3";
import { NobelViz } from "./NobelViz";
import { NobelLineChart } from "./NobelLineChart";
import { Menu } from "./Menu";

const dataURL =
  "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";
// const dataURL =
//   "https://gist.githubusercontent.com/idatatalks/823208b5cd51f2030519284b97f1119f/raw/b971e8eb0a04d15c4b4ca25b7a81a26f9a659613/example";

export const NobelApp = (props) => {
  const [{ data, isLoaded, isDataProcessed }, setData] = useState({
    data: null,
    isLoaded: false,
    isDataProcessed: false,
  });
  const [filter, setFilter] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("first effect start");
    fetchData(dataURL)
      .then((data) => {
        console.log("data parse start");
        setData({
          data: d3.csvParse(data, d3.autoType),
          isLoaded: true,
          isDataProcessed: false,
        });
        setFilter(data.filters);
        console.log("data parse middle before setIsLoaded");
        // setIsLoaded(true);
        console.log("data parse end!");
      })
      .catch((error) => console.log("out: ", error));
    console.log("first effect end!");
  }, []);

  const handleFilterChange = (filter2) => {
    console.log("compare filters:", data.filters === filter2);
    console.log(data.filters);
    console.log(filter2);
    data.filters = filter2;
    setFilter(filter);
    data.filteredData = getFilteredData(data);
  };

  if (data && !isDataProcessed) {
    setData({ data: parseData(data), isLoaded: true, isDataProcessed: true });
  }

  console.log("rendering!");
  if (!data) {
    return <h1>Loading data, please be patient or try again!</h1>;
  }
  console.log("FFF:", data);
  return (
    <>
      <Menu data={data} onSetFilter={handleFilterChange} />
      <NobelViz data={data.filteredData} isDataLoaded={isLoaded}></NobelViz>
      {/* <NobelFilter
        data={data}
        category={data.categories}
        gender={data.genders}
        countries={data.countries}
      ></NobelFilter> */}
    </>
  );
};
