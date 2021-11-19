import { useEffect, useState } from "react";
import { NobelFilter } from "./NobelFilter";
import { fetchData } from "../dataUtil";
import * as d3 from "d3";
import { NobelViz } from "./NobelViz";
import { NobelLineChart } from "./NobelLineChart";

const category = ["Physics", "Chemistry", "Peace", "Literature", "Biology"];
const gender = ["Male", "Female"];
const countries = ["USA", "China"];
const dataURL =
  "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";
// const dataURL =
//   "https://gist.githubusercontent.com/idatatalks/823208b5cd51f2030519284b97f1119f/raw/b971e8eb0a04d15c4b4ca25b7a81a26f9a659613/example";

export const NobelApp = (props) => {
  const [data, setData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("first effect start");
    fetchData(dataURL)
      .then((data) => {
        console.log("data parse start");
        setData(d3.csvParse(data, d3.autoType));
        console.log("data parse middle before setIsLoaded");
        setIsLoaded(true);
        console.log("data parse end!");
      })
      .catch((error) => console.log("out: ", error));
    console.log("first effect end!");
  }, []);
  // useEffect(() => {
  //   console.log("Second effect start -> d3 data:", data);
  //   if (data) setIsLoaded(true);
  //   console.log("Second effect end!");
  // }, [data]);

  console.log("rendering!");
  if (data === "") {
    return <h1>Loading data, please be patient or try again!</h1>;
  }

  return (
    <>
      <NobelViz data={data} isloaded={isLoaded}></NobelViz>
      {/* <NobelFilter
        category={category}
        gender={gender}
        countries={countries}
      ></NobelFilter> */}
    </>
  );
};
