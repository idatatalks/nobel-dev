import { useEffect, useState, Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { NobelFilter } from "./NobelFilter";
import { fetchData, parseData } from "../dataUtil";
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
  const [{ data, isLoaded, isDataProcessed }, setData] = useState({
    data: null,
    isLoaded: false,
    isDataProcessed: false,
  });
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
        console.log("data parse middle before setIsLoaded");
        // setIsLoaded(true);
        console.log("data parse end!");
      })
      .catch((error) => console.log("out: ", error));
    console.log("first effect end!");
  }, []);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
      {/* <NobelViz data={data} isloaded={isLoaded}></NobelViz> */}
      <div>
        {["left", "right", "top", "bottom"].map((anchor) => (
          <Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <NobelFilter
                data={data}
                category={data.categories}
                gender={data.genders}
                countries={data.countries}
              ></NobelFilter>
            </Drawer>
          </Fragment>
        ))}
      </div>
    </>
  );
};
