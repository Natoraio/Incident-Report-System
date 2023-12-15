import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncidentList from "../../components/incidentList";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import withAuth from "../../components/withAuth";
import styled, { createGlobalStyle } from "styled-components";

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
  const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  }
  
  body {
    width: 100%;
    align-items: center;
    flex-direction: column;
    align-items: stretch;
    padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    color: black;
    background-color: #ffffff;
    font-size: 25px;
    font-family: 'Kanit', sans-serif;
  }
`;

  const Content = styled.div`
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const ActionButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    margin-bottom: 0.5rem;
    font-size: 30px;
  `;

  const StyledButton = styled.button`
  padding: 3px;
  margin-left: 1rem;
  background-color: #ffffff;

  &:hover,
  &:focus {
    background-color: #d9d9d9;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    margin-left: 1rem;
  `;

  const CategorySeparator = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: 5px solid #d9d9d9;
    font-size: 30px;
    margin-left: 3rem;
    margin-right: 3rem;
  `;

  const IncidentSeparator = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
  `;

  const StyledIncident = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    margin-top: 1rem;
  `;

  return (
    <>
    <button className="p-3 m-2" onClick={handleLogout}>
        Log out
      </button>
      <button className="p-3 bg-blue-500 ml-2">
        <Link to={"/history-statistics"}>View History and Statistics</Link>
      </button>
      <GlobalStyle />
      <Content>
        <h1>Welcome Back! {name}</h1>
        <h2 className="mt-5">To SIIT Cyber Incident Report Database System</h2>
        <h3 className="mt-5">
          Click on an incident or select what action you want to complete today.
        </h3>
        <ActionButtons>
          <p>Sort incidents by: </p>
          <StyledButton onClick={sortByLatestDate}>Latest First</StyledButton>
          <StyledButton onClick={sortByCriticalityLowToHigh}>
            Criticality: Lowest First
          </StyledButton>
          <StyledButton onClick={sortByCriticalityHighToLow}>
            Criticality: Highest First
          </StyledButton>
        </ActionButtons>

        <CategorySeparator>
          <span>Incident Name</span>
          <span>Progress/Status</span>
          <span>Criticality Level</span>
          <span>Report Date</span>
        </CategorySeparator>

        {incidents.map((incident, index) => (
          <StyledLink
            to={`/incident-details/${incident.incidentID}`}
            key={incident.incidentID}
          >
            <StyledIncident>
              <IncidentSeparator>
                <span>{incident.incidentName}</span>
                <span>{incident.status}</span>
                <span>{incident.criticality}</span>
                <span>{incident.dateReported.split("T")[0]}</span>
              </IncidentSeparator>
            </StyledIncident>
          </StyledLink>
        ))}
      </Content>
    </>
  );
};

export default withAuth(HandlerMain, "Incident handler");
