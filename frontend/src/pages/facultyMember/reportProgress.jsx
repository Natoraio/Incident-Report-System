import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentProgress from "../../components/incidentProgress";
import Axios from "axios";

const ReportProgress = () => {
  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();
  console.log(lastPart);

  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/getIncidentProgress", {
      params: { userID: lastPart },
    })
      .then((response) => {
        console.log(response.data);
        const incidents = response.data.result.map((item) => ({
          name: item.Incident_name,
          progress: item.Incident_status,
          severity: item.Severity,
          date: item.Date,
        }));
        setIncidentList(incidents);
      })
      .catch((error) => {
        console.error("Error fetching incident progress:", error);
      });
  }, []);

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

export default ReportProgress;
