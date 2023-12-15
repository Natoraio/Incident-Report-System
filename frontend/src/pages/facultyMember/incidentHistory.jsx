import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportProgress from "./reportProgress.jsx";
import Axios from "axios";
import withAuth from "../../components/withAuth";
import "./incidentHistory.css"

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
        console.log(response.data);
        const incidents = response.data.result.map((item) => ({
          name: item.incidentName,
          severity: item.Criticality,
          occured: item.dateOccur.split("T")[0],
          resolved: item.dateResolved.split("T")[0],
          incidentID: item.incidentID,
        }));
        setIncidentList(incidents);
      })
      .catch((error) => {
        console.error("Error fetching incident history:", error);
      });
  }, []);

  

  return (
    <>
      <div className="text-content ml-10">
        <h1>Incident History</h1>
        <h2 className="mt-5">
            View all your past incidents here. Click on the individual incident to view more details
        </h2>

        <div className="incident-container" style={{ marginTop: '40px' }}>
          <div className="labels-container">
            <div>Incident Name</div>
            <div>Criticality Level</div>
            <div>Occured Date</div>
            <div>Resolved Date</div>
            <div>View Details</div>
          </div>
          {incidentList.map((incident, index) => (
            <div key={index} className="mb-4"style={{ marginTop: '60px'}}>
              <div className="incident-detail incident-name" name={incident.name}>
                {incident.name}
              </div>
              <div className="incident-detail" severity={incident.Criticality}>
                {incident.Criticality}
              </div>
              <div className="incident-detail" reported={incident.dateOccur}>
                {incident.dateOccur}
              </div>
              <div className="incident-detail" resolved={incident.dateResolved}>
                {incident.dateResolved}
              </div>
              <div className="view-details-button">
                <button className="p-5 bg-purple-500">
                  <Link to={`/incident-details/${incident.incidentID}`} style={{ color: 'white' }}>View Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default withAuth(IncidentHistory, "Staff");
