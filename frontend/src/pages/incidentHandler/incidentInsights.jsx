import React, { useEffect, useState } from "react";
// import { getIncidentStatistics } from "../../api"; // Assuming you have an API function to fetch incident statistics

const IncidentInsights = () => {
  const [statistics, setStatistics] = useState(null);

  //   useEffect(() => {
  //     // Fetch incident statistics from the API
  //     const fetchStatistics = async () => {
  //       try {
  //         const response = await getIncidentStatistics();
  //         setStatistics(response.data);
  //       } catch (error) {
  //         console.error("Failed to fetch incident statistics:", error);
  //       }
  //     };

  //     fetchStatistics();
  //   }, []);

  return (
    <div>
      <h1>Incident Insights</h1>
    </div>
  );
};

export default IncidentInsights;
