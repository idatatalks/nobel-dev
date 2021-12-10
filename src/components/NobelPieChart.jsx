import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
const RADIAN = Math.PI / 180;
export const NobelPieChart = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          cx={120}
          cy={150}
          outerRadius={70}
          fill="#8884d8"
          label={renderCustomizedLabel}
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = (props) => {
  const {
    x,
    y,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  } = props;
  console.log("Pie label:", props);
  
  return (
    <text
      x={x}
      y={y}
      dy={-5}
      fill="black"
      textAnchor="start"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
