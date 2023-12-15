import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncidentList from "../../components/incidentList";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import withAuth from "../../components/withAuth";

const HandlerMain = () => {
  const [handlerId, setHandlerId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [naviateLogin, setNaviateLogin] = useState(false);

  const navigate = useNavigate();

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
          setUsername(response.data.result[0].username);
          setName(response.data.result[0].name);
          console.log(response.data.result[0]);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [handlerId]);

  // Handler for sorting by latest date
  const sortByLatestDateAndTime = () => {
    setIncidents((prevIncidents) =>
      [...prevIncidents].sort((a, b) => {
        const dateA = new Date(
          a.dateReported.split("T")[0] + "T" + a.timeReported
        );
        const dateB = new Date(
          b.dateReported.split("T")[0] + "T" + b.timeReported
        );
        return dateB - dateA;
      })
    );
  };

  // Handler for sorting by criticality (low to high)
  const sortByCriticalityLowToHigh = () => {
    setIncidents((prevIncidents) =>
      [...prevIncidents].sort((a, b) => b.criticalID - a.criticalID)
    );
  };

  // Handler for sorting by criticality (high to low)
  const sortByCriticalityHighToLow = () => {
    setIncidents((prevIncidents) =>
      [...prevIncidents].sort((a, b) => a.criticalID - b.criticalID)
    );
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <button className="p-3 m-2" onClick={handleLogout}>
        Log out
      </button>
      <button className="p-3 bg-blue-500 ml-2">
        <Link to={"/history-statistics"}>View History and Statistics</Link>
      </button>
      <div className="text-content ml-10">
        <h1>Welcome Back! {name}</h1>
        <h2 className="mt-5">To SIIT Cyber Incident Report Database System</h2>
        <h3 className="mt-5">
          Click on an incident or select what action you want to complete today.
        </h3>
        <div className="action-buttons ml-10 mt-10">
          <p>Sort incidents by: </p>
          <button
            className="p-3 bg-orange-500"
            onClick={sortByLatestDateAndTime}
          >
            Latest First
          </button>
          <button
            className="p-3 bg-orange-500 ml-2"
            onClick={sortByCriticalityLowToHigh}
          >
            Criticality (Low to High)
          </button>
          <button
            className="p-3 bg-orange-500 ml-2"
            onClick={sortByCriticalityHighToLow}
          >
            Criticality (High to Low)
          </button>
        </div>
        <div className="incident-container">
          {incidents &&
            incidents.map((incident, index) => (
              <IncidentList
                key={incident.incidentID}
                id={incident.incidentID}
                name={incident.incidentName}
                progress={incident.status}
                severity={incident.criticality}
                date={incident.dateReported.split("T")[0]}
                handlerID={handlerId}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(HandlerMain, "Incident handler");
