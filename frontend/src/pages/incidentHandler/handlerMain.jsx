import React from "react";
import { Link } from "react-router-dom";
import IncidentList from "../../components/incidentList";

const HandlerMain = () => {
  const incidentList = [
    {
      name: "Incident 1",
      progress: "Ongoing",
      severity: "High",
      date: "2023-11-22",
    },
    {
      name: "Incident 2",
      progress: "Assigned",
      severity: "Medium",
      date: "2023-11-25",
    },
  ];
  return (
    <>
      <div className="text-content ml-10">
        <h1>Welcome Back!</h1>
        <h2 className="mt-5">To SIIT Cyber Incident Report Database System</h2>
        <h3 className="mt-5">
          Click on an incident or select what action you want to complete today.
        </h3>
        <div className="incident-container">
          {incidentList.map((incident, index) => (
            <IncidentList
              key={index}
              name={incident.name}
              progress={incident.progress}
              severity={incident.severity}
              date={incident.date}
            />
          ))}
        </div>
      </div>
      <div className="action-buttons ml-10 mt-10">
        <button className="p-3 bg-orange-500">
          <Link to={"/report"}>Create Monthly Report</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/incident-progress"}>View Data Visualization</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/report-summary"}>Incident History</Link>
        </button>
      </div>
    </>
  );
};

export default HandlerMain;
