import React from "react";

const IncidentRequest = ({ name, progress, severity, date }) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
  };

  return (
    <div className="incident-tab" onClick={handleClick}>
      <h1>{name}</h1>
      <p>Progress/Status: {progress}</p>
      <p>Severity Level: {severity}</p>
      <p>Date: {date}</p>
      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentRequest;
