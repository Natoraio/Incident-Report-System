import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentListHistory from "../../components/incidentListHistory";
import Axios from "axios";
import withAuth from "../../components/withAuth";

const IncidentHistory = () => {
  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();
  console.log(lastPart);

  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/getIncidentHistory", {
      params: { userID: lastPart },
    })
      .then((response) => {
        console.log(response);
        const incidents = response.data.result.map((item) => ({
          name: item.incidentName,
          criticality: item.criticality,
          reportedDate: item.dateReported.split("T")[0],
          resolvedDate: item.dateResolved.split("T")[0],
          incidentID: item.incidentID,
        }));
        setIncidentList(incidents);
      })
      .catch((error) => {
        console.error("Error fetching incident progress:", error);
      });
  }, []);

  return (
    <>
      <button>
        <Link to="/home">Back to home</Link>
      </button>
      <div className="text-content ml-10">
        <h1>Incident History</h1>
        <h2 className="mt-5">
          View all your past incidents here. Click on the individual incident to
          view more details
        </h2>

        <div className="incident-container">
          {incidentList.map((incident, index) => (
            <IncidentListHistory
              key={index}
              name={incident.name}
              criticality={incident.criticality}
              reportedDate={incident.reportedDate}
              resolvedDate={incident.resolvedDate}
              incidentID={incident.incidentID}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(IncidentHistory, "Staff");
