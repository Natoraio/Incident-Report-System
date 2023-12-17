import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncidentHistory from "../../components/incidentHistory";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import withAuth from "../../components/withAuth";
import IncidentTypeChart from "../../components/incidentTypeChart";
import IncidentsPerMonthChart from "../../components/incidentsPerMonthChart";
import styled, { createGlobalStyle } from "styled-components";

const HistoryStatistics = () => {
  const [incidents, setIncidents] = useState([]);
  const [handlerId, setHandlerId] = useState("");
  const [username, setUsername] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [noIncidents, setNoIncidents] = useState("");
  const [avgResolveTime, setAvgResolveTime] = useState("");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const navigate = useNavigate();

  const fetchIncidents = (url) => {
    Axios.get(url)
      .then((response) => {
        setIncidents(response.data.incidents);
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
        setNoIncidents(response.data.result[0].incidentCount);
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
        setAvgResolveTime(
          Math.ceil(response.data.result[0].averageResolveTime)
        );
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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      const userID = decodedToken.payloadObj.userID;
      setHandlerId(userID);
    } else {
      navigate("/login");
    }
    if (handlerId) {
      Axios.get("http://localhost:8800/api/getUserInfo", {
        params: { UserID: handlerId, UserType: "handler" },
      })
        .then((response) => {
          console.log(response.data.result[0]);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [handlerId]);

  const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  }
  
  body {
    align-items: center;
    flex-direction: column;
    align-items: stretch;
    // padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    font-size: 24px;
    font-family: 'Kanit', sans-serif;
  }
`;

  const Button = styled.button`
    margin-bottom: 10px;
  `;

  const PageTitle = styled.h1`
    margin-bottom: 20px;
  `;

  const StatisticParagraph = styled.p`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  `;

  const ChartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
    gap: 20px;
  `;

  const SelectMonth = styled.select`
    // padding: 10px;
    border-radius: 10px;
    border: 1px solid gray;
    margin: 20px;
  `;

  const IncidentContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin-left: 1rem;
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
    padding: 0.5rem;
    font-size: 18px;
  `;

  return (
    <>
      <GlobalStyle />
      <Button>
        <Link to="/handler-home">◀ Back to home</Link>
      </Button>
      <PageTitle>Incident History and Statistics</PageTitle>
      <StatisticParagraph>
        The number of incidents this month is: {noIncidents}
      </StatisticParagraph>
      <StatisticParagraph>
        The average resolve time this month is: {avgResolveTime}
      </StatisticParagraph>

      <ChartsContainer>
        <IncidentsPerMonthChart />
        <IncidentTypeChart selectedMonth={selectedMonth} />

        <SelectMonth
          className="p-3"
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
        </SelectMonth>
      </ChartsContainer>

      <CategorySeparator>
        <span>Incident Name</span>
        <span>Resolved Date</span>
        <span>Incident Type</span>
      </CategorySeparator>

      <IncidentContainer>
        {incidents &&
          incidents.map((incident, index) => (
            <StyledLink
              to={`/incident-details/${incident.incidentID}`}
              key={incident.incidentID}
            >
              <StyledIncident>
                <IncidentSeparator>
                  <span>{incident.incidentName}</span>
                  <span>
                    {incident.dateResolved
                      ? incident.dateResolved.split("T")[0]
                      : ""}
                  </span>
                  <span>{incident.incidentTypeName}</span>
                </IncidentSeparator>
              </StyledIncident>
            </StyledLink>
          ))}
      </IncidentContainer>
    </>
  );
};

export default withAuth(HistoryStatistics, "Incident handler");
