import React from "react";
import * as d3 from "d3";
import { COLOR_PALETTE } from "../../dataUtil";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  Cell,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const mark = {
  size: 10,
  width: 10,
  height: 15,
};

const horizontalGap = 10;
const margins = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 0,
};
const horPaddings = { left: 10, right: 20 };
const vertPaddings = { top: 10, bottom: 10 };

const buildData = (data) => {
  const sortedData = [...data].sort(
    (a, b) =>
      d3.ascending(a.year, b.year) || d3.ascending(a.category, b.category)
  );
  console.log("XXXXX dataPerYear1:", sortedData);
  console.log("XXXXX dataPerYear1:", data);
  const dataPerYear = d3.flatGroup(sortedData, (d) => d.year);

  dataPerYear.forEach(([year, data]) => {
    data.forEach((d, i) => {
      d.index = i + 1;
    });
  });
  console.log("XXXXX sorted category:", data.categories.slice().sort());
  sortedData.maxWinners = d3.max(dataPerYear, (d) => d[1].length);
  sortedData.yearNum =
    sortedData[sortedData.length - 1].year - sortedData[0].year + 1;
  console.log("XXXXX dataPerYear2:", dataPerYear);
  console.log("XXXXX sorted data:", sortedData);
  return [sortedData, data.categories.slice().sort()];
};

const WinnersByCategory = (props) => {
  console.log("WinnersByCategory render!");
  const { data } = props;
  const [dataPerYear, categories] = buildData(data);

  const chartHeight =
    mark.height * 1.2 * dataPerYear.maxWinners +
    margins.top +
    margins.bottom +
    vertPaddings.top +
    vertPaddings.bottom;

  const xAxisWidth =
    dataPerYear.yearNum * 20 +
    horPaddings.left +
    horPaddings.right +
    margins.left +
    margins.right;

  console.log(
    "WinnersByCategory Chart height:",
    chartHeight,
    " xAxisWidth:",
    xAxisWidth
  );

  return (
    <div
      style={{
        width: "100%",
        height: chartHeight + 20,
        overflow: "auto",
      }}
    >
      <ScatterChart
        margin={margins}
        width={xAxisWidth}
        height={chartHeight}
        minHeight={400}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDuplicatedCategory={false}
          dataKey={"year"}
          type={"number"}
          name={"year"}
          domain={["dataMin", "dataMax"]}
          interval={0}
          tickCount={dataPerYear.yearNum / 2 + 1}
          angle={-90}
          minTickGap={20}
          tickMargin={25}
          padding={horPaddings}
          tick={{
            textAnchor: "middle",
            verticalAnchor: "end",
            dx: -3,
          }}
          allowDataOverflow={true}
        />
        <YAxis
          dataKey={"index"}
          type={"number"}
          name={"WinnerCount"}
          interval={0}
          tickCount={dataPerYear.maxWinners}
          domain={["dataMin", "dataMax+2"]}
          padding={vertPaddings}
        />
        <ZAxis type="number" range={[100, 100]} />
        <Legend
          layout="horizontal"
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            paddingLeft: 60,
            paddingBottom: 10,
            width: "50%",
          }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {categories.map((category, index) => {
          const categoryData = dataPerYear.filter(
            (d) => d.category == category
          );
          console.log("fff category:", categoryData);
          return (
            <Scatter
              shape="circle"
              legendType="circle"
              name={category}
              data={categoryData}
              fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
            >
              {categoryData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                />
              ))}
            </Scatter>
          );
        })}
      </ScatterChart>
    </div>
  );
};

export default React.memo(WinnersByCategory);
