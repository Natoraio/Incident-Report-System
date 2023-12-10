import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const IncidentHistory = ({
  id,
  name,
  resolvedDate,
  incidentType,
  handlerID,
}) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
    console.log(id);
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>Resolved Date: {resolvedDate}</p>
      <p>Incident Type: {incidentType}</p>

      <button className="incident-tab p-3 bg-orange-500 ml-2">
        <Link to={"/incident-details/" + id}>View Details</Link>
      </button>

      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentHistory;
