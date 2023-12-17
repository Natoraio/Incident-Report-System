import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import withAuth from "../../components/withAuth";
import IncidentListHistory from "../../components/incidentListHistory";
import "./incidentHistory.css";

const IncidentHistory = () => {
  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();

  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/getIncidentHistory", {
      params: { userID: lastPart },
    })
      .then((response) => {
        const incidents = response.data.incidents.map((item) => ({
          name: item.incidentName,
          criticality: item.criticality,
          reportedDate: item.dateReported.split("T")[0],
          resolvedDate: item.dateResolved.split("T")[0],
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
      <Link to="/home" className="back-to-home-link">
        Back to home
      </Link>
      <div className="text-content ml-10">
        <h1>Incident History</h1>
        <h2 className="mt-5">
          View all your past incidents here. Click on the individual incident to
          view more details
        </h2>

        <div className="incident-container" style={{ marginTop: "40px" }}>
          <div className="labels-container">
            <div>Incident Name</div>
            <div>Criticality Level</div>
            <div>Occurred Date</div>
            <div>Resolved Date</div>
            <div>View Details</div>
          </div>
          {incidentList.map((incident, index) => (
            <div key={index} className="mb-4" style={{ marginTop: "60px" }}>
              <div className="incident-detail incident-name">
                {incident.name}
              </div>
              <div className="incident-detail">{incident.criticality}</div>
              <div className="incident-detail">{incident.reportedDate}</div>
              <div className="incident-detail">{incident.resolvedDate}</div>
              <div className="view-details-button">
                <button className="p-5 bg-purple-500">
                  <Link
                    to={`/incident-details/${incident.incidentID}`}
                    style={{ color: "white" }}
                  >
                    View Details
                  </Link>
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
