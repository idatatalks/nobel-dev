import { NobelScatter } from "./NobelScatter";
import { getFilteredData } from "../dataUtil";

export const NobelViz = ({ data, isDataLoaded }) => {
  const filteredData = getFilteredData(data);
  console.log("NobelViz rendered!");
  console.log("Filtered data:", filteredData);
  if (!isDataLoaded) {
    console.log("Data not loaded yet");
    return "";
  }
  return (
    <NobelScatter
      data={data}
      xAxis={{ dataKey: "", type: "number", name: "country", tickCount: "" }}
      yAxis={{ dataKey: "", type: "number", name: "country", tickCount: "" }}
      scatter={{
        legendType: "triangle",
        name: "Nobel Winners",
        data: { data },
      }}
    ></NobelScatter>
  );
};
