import { NobelScatter } from "./NobelScatter";

export const NobelViz = ({ data, isDataLoaded }) => {
  console.log("NobelViz rendered!");
  // console.log("isDataLoaded:", isDataLoaded);
  if (!isDataLoaded) {
    console.log("Data not loaded yet");
    return "";
  }
  return <NobelScatter data={data}></NobelScatter>;
};
