import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import axios from "axios";

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        style={{ fontSize: "12px" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomizedLegend = (props) => {
  // Return null to render nothing
  return null;
};

const IncidentTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/getIncidentsPerType", {
        params: {
          month: "11",
          year: "2023",
        }, // replace with your desired month and year
      })
      .then((response) => {
        if (response.data.success) {
          setData(response.data.result);
        }
      })
      .catch((err) => console.error("API call failed:", err));
  }, []);

  return (
    <BarChart
      layout="vertical"
      width={700}
      height={350}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 100,
        bottom: 20,
      }}
    >
      <XAxis type="number">
        <Label
          value="Number of Incidents"
          offset={-15}
          position="insideBottom"
        />
      </XAxis>
      <YAxis
        dataKey="incidentTypeName"
        type="category"
        tick={<CustomizedAxisTick />}
      >
        {/* <Label value="Incident Type" angle={-90} dx={-100} /> */}
      </YAxis>
      <Tooltip />
      <Legend content={<CustomizedLegend />} />
      <Bar dataKey="incidentCount" fill="#8884d8" />
    </BarChart>
  );
};

export default IncidentTypeChart;
