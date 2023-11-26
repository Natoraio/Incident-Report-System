import React from "react";
import { Link } from "react-router-dom";
import IncidentProgress from "../../components/incidentProgress";

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
        <h1>Incident Tracking</h1>
        <h2 className="mt-5">
          View the progress / details of your reported incidents here
        </h2>

        <div className="incident-container">
          {incidentList.map((incident, index) => (
            <IncidentProgress
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
