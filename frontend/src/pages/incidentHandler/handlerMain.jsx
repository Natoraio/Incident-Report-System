import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentList from "../../components/incidentList";
import Axios from "axios";
import { KJUR } from "jsrsasign";

const HandlerMain = () => {
  const [handlerId, setHandlerId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [incidents, setIncidents] = useState([]);

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
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      const handlerId = decodedToken.payloadObj.handlerId;
      setHandlerId(handlerId);
      console.log("Handler ID: " + handlerId);
      //   console.log(decodedToken.payloadObj);
    }
  }, []);

  useEffect(() => {
    if (handlerId) {
      Axios.get("http://localhost:8800/api/getUserInfo", {
        params: { HandlerID: handlerId, UserType: "handler" },
      })
        .then((response) => {
          setUsername(response.data.result[0].Username);
          setName(response.data.result[0].Handler_name);
          console.log(response.data.result[0]);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [handlerId]);

  return (
    <>
      <div className="action-buttons ml-10 mt-10">
        <button className="p-3 bg-orange-500">
          <Link to={"/report"}>Latest First</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/incident-progress"}>Criticality (Low to High)</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/report-summary"}>Criticality (High to Low)</Link>
        </button>
      </div>
      <div className="text-content ml-10">
        <h1>Welcome Back! {name}</h1>
        <h2 className="mt-5">To SIIT Cyber Incident Report Database System</h2>
        <h3 className="mt-5">
          Click on an incident or select what action you want to complete today.
        </h3>
        <div className="incident-container">
          {incidents &&
            incidents.map((incident, index) => (
              <IncidentList
                key={incident.Report_id}
                id={incident.Report_id}
                name={incident.Incident_name}
                progress={incident.Incident_status}
                severity={incident.Criticality}
                date={incident.Date}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default HandlerMain;
