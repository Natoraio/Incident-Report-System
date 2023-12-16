import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentProgress from "../../components/incidentProgress";
import Axios from "axios";
import withAuth from "../../components/withAuth";
import "./reportProgress.css"

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
          name: item.incidentName,
          progress: item.status,
          severity: item.HandlerCriticality,
          date: item.dateReported.split("T")[0],
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
        <h1>Incident Tracking</h1>
        <h2 className="mt-5">
          View the progress / details of your reported incidents here. Click on
          the individual incident to view more details!
        </h2>

        <div className="incident-container" style={{ marginTop: '40px' }}>
          <div className="labels-container">
            <div>Incident Name</div>
            <div>Progress/Status</div>
            <div>Criticality Level</div>
            <div>Report Date</div>
            <div>View Details</div>
          </div>
          {incidentList.map((incident, index) => (
            <div key={index} className="mb-4"style={{ marginTop: '60px'}}>
              <div className="incident-detail incident-name" name={incident.name}>
                {incident.name}
              </div>
              <div className="incident-detail" progress={incident.progress}>
                {incident.progress}
              </div>
              <div className="incident-detail" severity={incident.severity}>
                {incident.severity}
              </div>
              <div className="incident-detail" date={incident.date}>
                {incident.date}
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
      <div className="action-buttons ml-10 mt-10 mb-3">
        <button className="p-5 bg-orange-500 ml-50" style={{ display: 'block', margin: '0 auto', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <Link to={"/incident-history/" + lastPart} style={{ color: 'white' }}>Incident History</Link>
        </button>
      </div>
    </>
  );
};

export default withAuth(ReportProgress, "Staff");
