import { useEffect, useState } from "react";
import { NobelFilter } from "./NobelFilter";
import { fetchData } from "../dataUtil";

const category = ["Physics", "Chemistry", "Peace", "Literature", "Biology"];
const gender = ["Male", "Female"];
const countries = ["USA", "China"];
const dataURL =
  "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";

export const NobelApp = (props) => {
  const [data, setData] = useState("");
  // const [category, setCategory] = useState(null)

  useEffect(() => {
    console.log("effect run only once");
    fetchData(dataURL)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log("out:", error));

    // d3.csvFormat
  }, []);

  if (data === "") return <h1>Nobel Data fetch failed, please try again.</h1>;

  return (
    <NobelFilter
      category={category}
      gender={gender}
      countries={countries}
    ></NobelFilter>
  );
};
