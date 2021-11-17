import { NobelScatter } from "./NobelScatter";

export const NobelViz = (props) => {
  console.log("NobelViz rendered!");
  if (!props.isloaded) {
    console.log("xxx: data not loaded yet");
    return "";
  }
  return <NobelScatter data={props.data}></NobelScatter>;
};
