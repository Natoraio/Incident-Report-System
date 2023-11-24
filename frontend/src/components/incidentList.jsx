import React from "react";

const IncidentList = ({ name, progress, severity, date }) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
  };

  return (
    <div className="incident-tab" onClick={handleClick}>
      <h3>{name}</h3>
      <p>Progress/Status: {progress}</p>
      <p>Severity Level: {severity}</p>
      <p>Date: {date}</p>
      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentList;
