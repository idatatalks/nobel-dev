import { NobelScatter } from "./NobelScatter";
import { getFilteredData } from "../dataUtil";

export const NobelViz = ({ data, isDataLoaded }) => {
  // const filteredData = getFilteredData(data);
  console.log("NobelViz rendered!");
  console.log("Filtered data:", data);
  if (!isDataLoaded) {
    console.log("Data not loaded yet");
    return "";
  }
  return (
    <NobelScatter
      data={data}
      xAxisConf={{
        data: { data },
        dataKey: "countryId",
        type: "number",
        name: "country",
        tickCount: data.countryNum,
      }}
      yAxisConf={{
        dataKey: "winnerId",
        type: "number",
        name: "number",
        tickCount: data.maxWinners[1],
      }}
      scatter={{
        legendType: "triangle",
        name: "Nobel Winners",
        data: { data },
      }}
    ></NobelScatter>
  );
};
