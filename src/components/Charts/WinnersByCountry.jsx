import * as React from "react";
import {
  ComposedChart,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
  Brush,
} from "recharts";

import {
  getNumByCountry,
  getRadioByCountry,
  COLOR_PALETTE,
} from "../../dataUtil";

const margins = {
  top: 20,
  right: 5,
  bottom: 100,
  left: 30,
};

export const WinnersByCountry = ({
  data,
  xDataKey,
  xDataType,
  barDataKey,
  barDataType,
  beginYear,
  endYear,
}) => {
  console.log("WinnersByCountry render");
  data = getNumByCountry(data);
  console.log("XXX barchartData:", data);

  const minXTickGap = 50;
  const minWidth = data.length * minXTickGap;
  console.log("minWidth:", minWidth);
  return (
    <>
      <ResponsiveContainer
        width={"100%"}
        minWidth={minWidth}
        height={600}
        minHeight={500}
      >
        <BarChart
          data={data}
          margin={margins}
          style={{ /*overflow: "auto", */ border: "2px solid red" }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey={xDataKey}
            tick={<CustomizedAxisTick data={data} />}
            tickLine={false}
            axisLine={false}
            allowDataOverflow={false}
            interval={0}
            fontSize={20}
          />
          <YAxis hide={true} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip /> */}
          <Legend
            name="Winners Rank By Country123"
            verticalAlign="top"
            height={36}
            wrapperStyle={{ top: 5, paddingTop: 20, border: "2px solid green" }}
          />
          <Bar
            name={`Nobel winners by country(${beginYear}~${endYear})`}
            dataKey={barDataKey}
            fill="green"
            style={{ border: "2px solid yellow" }}
            interval={30}
          >
            <LabelList dataKey={barDataKey} position="top" />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
              />
            ))}
          </Bar>
          {/* <Brush dataKey={xDataKey} height={30} y={-15} stroke="#8884d8" /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload, data, index } = props;
  console.log("YYY:", props);
  console.log("Payload value:", data[payload.value - 1].country);
  // const xlabels = Array.from(data.countries);
  // console.log(xlabels);
  // console.log(payload.value - 1, xlabels[payload.value - 1]);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-5}
        dy={0}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {data[payload.value - 1].country}
        {/* {payload.value - 1} */}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  //Don't display tooltip, but remaining the animation effect of bar selection
  return null;
};

export default React.memo(WinnersByCountry);
