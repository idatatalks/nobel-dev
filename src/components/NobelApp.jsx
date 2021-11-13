import { useEffect, useState } from "react";
import { NobelFilter } from "./NobelFilter";
import { fetchData } from "../dataUtil";
import * as d3 from "d3";

const category = ["Physics", "Chemistry", "Peace", "Literature", "Biology"];
const gender = ["Male", "Female"];
const countries = ["USA", "China"];
// const dataURL =
//   "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";
const dataURL =
  "https://gist.githubusercontent.com/idatatalks/823208b5cd51f2030519284b97f1119f/raw/b971e8eb0a04d15c4b4ca25b7a81a26f9a659613/example";

export const NobelApp = (props) => {
  const [data, setData] = useState("");
  // const [category, setCategory] = useState(null)

  useEffect(() => {
    console.log("effect run only once");
    fetchData(dataURL)
      .then((data) => {
        console.log("data parse start");
        setData(d3.csvParse(data));
        console.log("data parse end!");
      })
      .catch((error) => console.log("out:", error));
    console.log("first effect end!");
  }, []);

  useEffect(() => {
    // console.log("set column :", data[0]);
    const data = null;
    d3.csv(dataURL).then((data) => console.log(data));
    console.log("d3 data: ", data);
    console.log("yy", d3.csvParse("foo,bar\n1,2"));
    // const {
    //   category,
    //   country,
    //   date_of_birth,
    //   date_of_death,
    //   gender,
    //   link,
    //   name,
    //   place_of_birth,
    //   place_of_death,
    //   text,
    //   year,
    //   award_age
    // } = data[0];
  }, []);

  if (data === "")
    return <h1>Loading data, please be patient or try again!</h1>;

  return (
    <NobelFilter
      category={category}
      gender={gender}
      countries={countries}
    ></NobelFilter>
  );
};
