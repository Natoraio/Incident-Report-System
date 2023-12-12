import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncidentHistory from "../../components/incidentHistory";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import withAuth from "../../components/withAuth";
import IncidentTypeChart from "../../components/incidentTypeChart";
import IncidentsPerMonthChart from "../../components/incidentsPerMonthChart";

const HistoryStatistics = () => {
  const [incidents, setIncidents] = useState([]);
  const [handlerId, setHandlerId] = useState("");
  const [username, setUsername] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [noIncidents, setNoIncidents] = useState("");
  const [avgResolveTime, setAvgResolveTime] = useState("");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // const currentMonth = new Date().getMonth() + 1;

  // useEffect(() => {
  //   fetchIncidents("http://localhost:8800/api/getIncidents");
  // }, []);

  const fetchIncidents = (url) => {
    Axios.get(url)
      .then((response) => {
        console.log("getResolvedIncidents is reached");
        setIncidents(response.data.incidents);
        console.log(response.data.incidents);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
      });
  };

  useEffect(() => {
    fetchIncidents("http://localhost:8800/api/getResolvedIncidents");
    setSelectedMonth(currentMonth);
  }, []);

  const fetchNumberOfIncidentsPerMonth = (url) => {
    Axios.get(url, { params: { month: selectedMonth, year: currentYear } })
      .then((response) => {
        console.log("getIncidentsPerMonth is reached");
        setNoIncidents(response.data.result[0].incidentCount);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
      });
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchNumberOfIncidentsPerMonth(
        "http://localhost:8800/api/getIncidentCount"
      );
    }
  }, [selectedMonth]);

  const fetchAvgResolveTime = (url) => {
    Axios.get(url, { params: { month: selectedMonth, year: currentYear } })
      .then((response) => {
        console.log("getAvgResolveTime is reached");
        setAvgResolveTime(
          Math.ceil(response.data.result[0].averageResolveTime)
        );
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
      });
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchAvgResolveTime("http://localhost:8800/api/getAverageResolveTime");
    }
  }, [selectedMonth]);

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
      <p>The number of incidents this month is: {noIncidents}</p>
      <p>The average resolve time this month is: {avgResolveTime}</p>
      <h1>Incident List</h1>
      <IncidentsPerMonthChart />
      <IncidentTypeChart />
      <select
        className="p-3 rounded"
        value={selectedMonth}
        onChange={(event) => {
          setSelectedMonth(event.target.value);
        }}
      >
        <option value="">Select Month</option>
        <option value="1">January</option>
        <option value="2">Febuary</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

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
