import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const CustomizedLegend = (props) => {
  // Return null to render nothing
  return null;
};

const IncidentsPerMonthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/getIncidentsPerMonth", {
        params: {
          year: "2023", // replace with your desired year
        },
      })
      .then((response) => {
        if (response.data.success) {
          setData(response.data.result);
        }
      })
      .catch((err) => console.error("API call failed:", err));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 70,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.4} />
        <XAxis dataKey="month">
          <Label value="Month" offset={-15} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Number of Incidents" angle={-90} dx={-20} />
        </YAxis>
        <Tooltip />
        <Legend content={<CustomizedLegend />} />
        <Line
          type="monotone"
          dataKey="incidentCount"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncidentsPerMonthChart;
