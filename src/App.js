import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.module.css";
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

const renderLineChart = (
  <LineChart width={600} height={300} data={data}>
    <Line
      type="monotone"
      dataKey="pv"
      stroke="#8884d8"
      margin={{ top: 50, right: 20, bottom: 5, left: 200 }}
    />
    <CartesianGrid stroke="#ccc" strokeDasharray="10 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

export default function App() {
  return (
    <div className="App">
      <h1>Nobel Prize All In One</h1>
      {/* {renderLineChart} */}
    </div>
  );
}
