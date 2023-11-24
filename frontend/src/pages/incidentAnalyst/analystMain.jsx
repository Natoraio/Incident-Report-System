import React from "react";
import { Link } from "react-router-dom";
import IncidentList from "../../components/incidentList";

const AnalystMain = () => {
  const incidentList = [
    {
      name: "Incident 1",
      progress: "Ongoing",
      severity: "High",
      date: "2023-11-22",
    },
  ];
  return (
    <>
      <div className="text-content ml-10 flex flex-col">
        <h1>Welcome Back!</h1>
        <h2>Cyber Incident List</h2>
        <p>Click on an incident to take view details and take action</p>
        <div className="incident-container">
          {incidentList.map((incident, index) => (
            <IncidentList
              key={index}
              name={incidentList.name}
              progress={incidentList.progress}
              severity={incidentList.severity}
              date={incidentList.date}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AnalystMain;
