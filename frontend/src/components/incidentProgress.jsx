import React from "react";
import { Link } from "react-router-dom";

const IncidentProgress = ({ name, progress, severity, date, incidentID }) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>Progress/Status: {progress}</p>
      <p>Severity Level: {severity}</p>
      <p>Reported Date: {date}</p>
      <button className="incident-tab p-3 bg-orange-300 ml-2">
        <Link to={"/incident-details/" + incidentID}>View Details</Link>
      </button>
      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentProgress;
