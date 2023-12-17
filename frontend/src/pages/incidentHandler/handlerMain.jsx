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
  const [focusedButton, setFocusedButton] = useState(
    "Latest First",
    "Criticality: Lowest First",
    "Criticality: Highest First"
  );

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
    font-size: 20px;
    font-family: 'Kanit', sans-serif;
  }
`;

  const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: space-between;
  `;

  const LeftContent = styled.div`
    flex: 1;
  `;

  const RightContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `;

  const ActionButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 1.5rem;
    font-size: 20px;
    white-space: nowrap;
  `;

  const StyledButton = styled.button`
    width: 300px;
    border-radius: 100px;
    margin: 1rem;
    background-color: ${(props) =>
      props.isFocused ? "#d9d9d9" : "transparent"};
    transition: background-color 0.3s;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `;

  const CategorySeparator = styled.div`
    display: flex;
    // flex-direction: flex-start;
    justify-content: space-between;
    // align-items: center;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: 3px solid #d9d9d9;

    span {
      flex: 1;
      text-align: center;
      padding: 1rem;
    }
  `;

  const IncidentSeparator = styled.div`
    display: flex;
    justify-content: space-evenly;

    span {
      flex: 1;
      text-align: center;
      padding: 0.5rem;
    }
  `;

  const StyledIncident = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-bottom: 1px solid #ccc;
    // padding: 0.5rem;
    font-size: 18px;
    padding-bottom: 1.5rem;
  `;
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin-left: 1rem;
  `;

  return (
    <>
      <GlobalStyle />
      <ContentHeader>
        <LeftContent>
          <h1>Welcome Back! {name}</h1>
          <h2 className="mt-5">
            To SIIT Cyber Incident Report Database System
          </h2>
          <h3 className="mt-5">
            Click on an incident or select what action you want to complete
            today.
          </h3>
        </LeftContent>
        <RightContent>
          <button className="p-3 m-2" onClick={handleLogout}>
            Not you?{" "}
            <span
              style={{
                textDecoration: "underline",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Logout
            </span>
          </button>

          <button style={{ backgroundColor: "#390656", color: "#fff" }}>
            <Link
              to={"/history-statistics"}
              style={{
                color: "#fff",
                textDecoration: "none",
                ":hover": { backgroundColor: "#d9d9d9" },
              }}
            >
              View History and Statistics
            </Link>
          </button>
        </RightContent>
      </ContentHeader>
      <ActionButtons>
        <p>Sort incidents by: </p>
        <StyledButton
          onClick={() => {
            setFocusedButton("Latest First");
            sortByLatestDateAndTime();
          }}
          isFocused={focusedButton === "Latest First"}
        >
          Latest First
        </StyledButton>
        <StyledButton
          onClick={() => {
            setFocusedButton("Criticality: Lowest First");
            sortByCriticalityLowToHigh();
          }}
          isFocused={focusedButton === "Criticality: Lowest First"}
        >
          Criticality: Lowest First
        </StyledButton>
        <StyledButton
          onClick={() => {
            setFocusedButton("Criticality: Highest First");
            sortByCriticalityHighToLow();
          }}
          isFocused={focusedButton === "Criticality: Highest First"}
        >
          Criticality: Highest First
        </StyledButton>
      </ActionButtons>

      <CategorySeparator>
        <span>Incident Name</span>
        <span>Progress / Status</span>
        <span>Criticality Level</span>
        <span>Reported Date</span>
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
    </>
  );
};

export default withAuth(HandlerMain, "Incident handler");
