import React, { useEffect, useState } from "react";

const IncidentHistory = () => {
  const [incidentRecords, setIncidentRecords] = useState([]);

  useEffect(() => {
    // Fetch incident records from the backend API
    const fetchIncidentRecords = async () => {
      try {
        const response = await fetch("/api/incident-records");
        const data = await response.json();
        setIncidentRecords(data);
      } catch (error) {
        console.error("Error fetching incident records:", error);
      }
    };

    fetchIncidentRecords();
  }, []);

  return (
    <div>
      <h1>Incident History</h1>
      {incidentRecords.length === 0 ? (
        <p>No incident records found.</p>
      ) : (
        <ul>
          {incidentRecords.map((record) => (
            <li key={record.id}>
              {/* Display incident record details */}
              <p>Incident ID: {record.id}</p>
              <p>Description: {record.description}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentHistory;
