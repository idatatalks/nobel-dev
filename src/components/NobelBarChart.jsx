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
}) => {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKey} type={xDataType} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={barDataKey} fill="green" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
