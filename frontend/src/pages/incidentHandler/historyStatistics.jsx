import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncidentHistory from "../../components/incidentHistory";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import withAuth from "../../components/withAuth";

const HistoryStatistics = () => {
  const [incidents, setIncidents] = useState([]);
  const [handlerId, setHandlerId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchIncidents("http://localhost:8800/api/getIncidents");
  }, []);

  const fetchIncidents = (url) => {
    Axios.get(url)
      .then((response) => {
        console.log("getIncidents is reached");
        setIncidents(response.data.incidents);
        console.log(response.data.incidents);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
      });
  };
  useEffect(() => {
    fetchIncidents("http://localhost:8800/api/getIncidents");
  }, []);

  // NEED TO FILTER THE INCIDENTS TO DISPLAY ONLY RESOLVED INCIDENTS

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      const userID = decodedToken.payloadObj.userID;
      setHandlerId(userID);
      console.log(decodedToken.payloadObj);
    } else {
      navigate("/login");
    }
    if (handlerId) {
      Axios.get("http://localhost:8800/api/getUserInfo", {
        params: { UserID: handlerId, UserType: "handler" },
      })
        .then((response) => {
          //   setUsername(response.data.result[0].username);
          //   setName(response.data.result[0].name);
          console.log(response.data.result[0]);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [handlerId]);

  return (
    <div>
      <h1>Incident List</h1>

      <div className="incident-container">
        {incidents &&
          incidents.map((incident, index) => (
            <IncidentHistory
              key={incident.incidentID}
              id={incident.incidentID}
              name={incident.incidentName}
              resolvedDate={
                incident.dateResolved ? incident.dateResolved.split("T")[0] : ""
              }
              incidentType={incident.incidentTypeName}
              handlerID={handlerId}
            />
          ))}
      </div>

      {/* Add your graphs here */}
    </div>
  );
};

export default HistoryStatistics;
