import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const IncidentTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/getIncidentsPerType", { month: "11", year: "2023" }) // replace with your desired month and year
      .then((response) => {
        if (response.data.success) {
          setData(response.data.result);
          console.log(response.data);
          console.log("Success MAYBEEEEEEEEEEEEEEEEEEEEEE");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="incidentTypeName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="incidentCount" fill="#8884d8" />
    </BarChart>
  );
};

export default IncidentTypeChart;
