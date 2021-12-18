import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getNobelNumPerCountry, getDataByRadio } from "../dataUtil";

const RADIAN = Math.PI / 180;
const margins = {
  top: 30,
  right: 5,
  bottom: 100,
  left: 5,
};

export const NobelPieChart = ({ data, dataKey, beginYear, endYear }) => {
  const filteredData = filterDataByRadio(data, 5);
  console.log("filtered pie data:", filteredData);
  return (
    <ResponsiveContainer
      width={"100%"}
      minWidth={240}
      height={600}
      minHeight={500}
    >
      <PieChart margin={margins} style={{ border: "2px solid red" }}>
        <text x={120} y={30} fill="#666" textAnchor="middle">
          Winners Percentage By Country
          <tspan x={120} y={50}>
            ({beginYear}~{endYear})
          </tspan>
        </text>
        <Pie
          data={filteredData}
          dataKey={dataKey}
          cx={120}
          cy={150}
          outerRadius={70}
          fill="#8884d8"
          label={renderCustomizedLabel}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#f7efd2",
            borderRadius: 10,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          content={<CustomTooltip data={filteredData} />}
          allowEscapeViewBox={{ x: false, y: false }}
        />
        <Legend content={<CustomLegend data={filteredData} />} />
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
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = (props) => {
  const { data, active, payload, label, contentStyle } = props;
  console.log("Pie tooltop:", props);

  if (active && payload && payload.length) {
    const index = payload[0].name;
    console.log("Pie index:", index);
    const { country, number, radio } = data[index];
    return (
      <div style={{ ...contentStyle }}>
        <p>{`Percentage: ${radio.toFixed(0)}%`}</p>
        <p>{`Number: ${number}`}</p>
        <p>{`Country: ${country}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = (props) => {
  const { data, payload } = props;
  console.log("xxx legend:", props);
  return (
    <ul style={{ marginTop: 20 }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>{data[entry.value].country}</li>
      ))}
    </ul>
  );
};

const filterDataByRadio = (data, minRadio) => {
  data = getNobelNumPerCountry(data);
  console.log("barchartData:", data);
  data = getDataByRadio(data);

  console.log("XXXXXX, RAW data:", data);
  let totalNum = data.reduce((acc, c) => acc + c.number, 0);
  console.log("XXXXXX, RAW data total num:", totalNum);
  let filteredData = data.filter((d) => d.radio >= minRadio);
  console.log("XXXXXX, filtered data:", filteredData);
  let othersRadio = 100 - filteredData.reduce((acc, c) => acc + c.radio, 0);
  let totalFilteredNum = filteredData.reduce((acc, c) => acc + c.number, 0);
  filteredData.push({
    country: "Others",
    countryId: filteredData.length + 1,
    number: totalNum - totalFilteredNum,
    radio: othersRadio,
  });
  return filteredData;
};
