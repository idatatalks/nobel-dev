import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

export const NobelBarChart = ({
  data,
  xDataKey,
  xDataType,
  barDataKey,
  barDataType,
  beginYear,
  endYear,
}) => {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKey} tick={<CustomizedAxisTick data={data} />} />
          <YAxis />
          <Tooltip />
          <Legend
            name="Winners Rank By Country123"
            verticalAlign="top"
            height={36}
          />
          <Bar
            name={`Winners Rank By Country(${beginYear}~${endYear})`}
            dataKey={barDataKey}
            fill="green"
          />
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
      </text>
    </g>
  );
};
