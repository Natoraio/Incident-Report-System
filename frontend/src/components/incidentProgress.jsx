import React from "react";
import { Link } from "react-router-dom";

const IncidentProgress = ({ name, progress, severity, date }) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>Progress/Status: {progress}</p>
      <p>Severity Level: {severity}</p>
      <p>Date: {date}</p>
      <button className="incident-tab p-3 bg-orange-300 ml-2">
        <Link to={"/incident-details"}>View Details</Link> useID as las
      </button>
      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentProgress;
