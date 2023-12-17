import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import withAuth from "../../components/withAuth";
import IncidentListHistory from "../../components/incidentListHistory";
import styled, { createGlobalStyle } from "styled-components";

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

const CategorySeparator = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 3px solid #d9d9d9;
  font-size: 20px;
  margin-top: 2rem;

  span {
    flex: 1;
    text-align: center;
    padding: 1rem;
  }
`;

const IncidentSeparator = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;

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
  padding-bottom: 0.3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-left: 1rem;
`;

const IncidentHistory = () => {
  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();

  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/getIncidentHistory", {
      params: { userID: lastPart },
    })
      .then((response) => {
        const incidents = response.data.incidents.map((item) => ({
          name: item.incidentName,
          criticality: item.criticality,
          reportedDate: item.dateReported.split("T")[0],
          resolvedDate: item.dateResolved.split("T")[0],
          incidentID: item.incidentID,
        }));
        setIncidentList(incidents);
      })
      .catch((error) => {
        console.error("Error fetching incident history:", error);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Link to="/home" className="back-to-home-link">
        ◀ Back to home
      </Link>
      <div className="text-content ml-10">
        <h1>Incident History</h1>
        <h2 className="mt-5">
          View all your past incidents here. Click on the individual incident to
          view more details
        </h2>

        <CategorySeparator>
          <span>Incident Name</span>
          <span>Criticality Level</span>
          <span>Occurred Date</span>
          <span>Resolved Date</span>
        </CategorySeparator>

        {incidentList.map((incident, index) => (
          <StyledLink
            to={`/incident-details/${incident.incidentID}`}
            key={incident.incidentID}
          >
            <StyledIncident>
              <IncidentSeparator>
                <span>{incident.name}</span>
                <span>{incident.criticality}</span>
                <span>{incident.reportedDate}</span>
                <span>{incident.resolvedDate}</span>
              </IncidentSeparator>
            </StyledIncident>
          </StyledLink>
        ))}
      </div>
    </>
  );
};

export default withAuth(IncidentHistory, "Staff");
