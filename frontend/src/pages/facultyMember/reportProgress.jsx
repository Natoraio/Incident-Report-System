import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentProgress from "../../components/incidentProgress";
import Axios from "axios";
import withAuth from "../../components/withAuth";
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

const StyledButton = styled.button`
  border-radius: 10px;
  margin: 1rem;
`;

const ReportProgress = () => {
  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();
  console.log(lastPart);

  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8800/api/getIncidentProgress", {
      params: { userID: lastPart },
    })
      .then((response) => {
        console.log(response.data);
        const incidents = response.data.result.map((item) => ({
          name: item.incidentName,
          progress: item.status,
          severity: item.HandlerCriticality,
          date: item.dateReported.split("T")[0],
          incidentID: item.incidentID,
        }));
        setIncidentList(incidents);
      })
      .catch((error) => {
        console.error("Error fetching incident progress:", error);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Link to="/home" className="back-to-home-link">
        ◀ Back to home
      </Link>
      <div className="text-content ml-10">
        <h1>Incident Tracking</h1>
        <h2 className="mt-5">
          View the progress / details of your reported incidents here. Click on
          the individual incident to view more details!
        </h2>

        <CategorySeparator>
          <span>Incident Name</span>
          <span>Progress / Status</span>
          <span>Criticality Level</span>
          <span>Reported Date</span>
        </CategorySeparator>

        {incidentList.map((incident, index) => (
          <StyledLink
            to={`/incident-details/${incident.incidentID}`}
            key={incident.incidentID}
          >
            <StyledIncident>
              <IncidentSeparator>
                <span>{incident.name}</span>
                <span>{incident.progress}</span>
                <span>{incident.severity}</span>
                <span>{incident.date.split("T")[0]}</span>
              </IncidentSeparator>
            </StyledIncident>
          </StyledLink>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton style={{ backgroundColor: "#390656", color: "#fff" }}>
          <Link
            to={"/incident-history/" + lastPart}
            style={{
              color: "#fff",
              textDecoration: "none",
              ":hover": { backgroundColor: "#d9d9d9" },
            }}
          >
            Incident History
          </Link>
        </StyledButton>
      </div>
    </>
  );
};

export default withAuth(ReportProgress, "Staff");
