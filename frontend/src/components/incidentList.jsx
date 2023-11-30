import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const IncidentList = ({ id, name, progress, severity, date, handlerID }) => {
  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
    console.log(id);
  };

  const ResolveIndicent = () => {
    console.log("Incident resolved");
    Axios.post("http://localhost:8800/api/resolveIncident", {
      incidentID: id,
      handlerID: handlerID,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("Incident resolved");
          Swal.fire({
            title: "Success!",
            text: "Incident resolved!",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error.response);
        Swal.fire({
          title: "Error!",
          text: "Failed to resolve incident",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>Progress/Status: {progress}</p>
      <p>Severity Level: {severity}</p>
      <p>Date: {date}</p>
      <button className="incident-tab p-3 bg-orange-500 ml-2">
        <Link to={"/response-form/" + id}>Create Response Report</Link>
      </button>
      <button className="incident-tab p-3 bg-orange-500 ml-2">
        <Link to={"/incident-details/" + id}>View Details</Link>
      </button>
      <button
        className="incident-tab p-3 bg-orange-500 ml-2"
        onClick={ResolveIndicent}
      >
        Mark as Resolved
      </button>
      {/* Add more incident details here */}
    </div>
  );
};

export default IncidentList;
