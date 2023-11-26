import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const IncidentList = ({ id, name, progress, severity, date }) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
    console.log(id);
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>Progress/Status: {progress}</p>
      <p>Severity Level: {severity}</p>
      <p>Date: {date}</p>
      <button className="incident-tab p-3 bg-orange-500 ml-2">
        <Link to={"/response-form"}>Create Response Report</Link>
      </button>
      <button className="incident-tab p-3 bg-orange-500 ml-2">
        <Link to={"/incident-details/" + id}>View Details</Link>
      </button>
      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentList;
