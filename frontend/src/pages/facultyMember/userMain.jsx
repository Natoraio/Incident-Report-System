import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KJUR } from "jsrsasign";
import Axios from "axios";
import withAuth from "../../components/withAuth";
// import "./userMain.css";
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

const TextContent = styled.div`
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
`;

const WelcomeBackHeading = styled.h1`
  padding-left: 100px;
  padding-bottom: 20px;
`;

const WelcomeBackSubHeading = styled.h2`
  padding-left: 120px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding-top: 50px;
  padding-left: 200px;
  padding-right: 100px;
`;

const UserMain = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      const userID = decodedToken.payloadObj.userID;
      setUserId(userID);
      console.log(decodedToken.payloadObj);
    } else {
      navigate("/login");
    }
    if (userId) {
      Axios.get("http://localhost:8800/api/getUserInfo", {
        params: { UserID: userId },
      })
        .then((response) => {
          setUsername(response.data.result[0].username);
          setName(response.data.result[0].name);
          setEmail(response.data.result[0].email);
          setUserType(response.data.result[0].role);
          console.log(response.data.result[0]);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <GlobalStyle />
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

      <TextContent>
        <WelcomeBackHeading>Welcome back, {name}!</WelcomeBackHeading>
        <WelcomeBackSubHeading>
          To SIIT Cyber Incident Report Database System
        </WelcomeBackSubHeading>
        <WelcomeBackSubHeading>
          Select what action you want to complete today.
        </WelcomeBackSubHeading>
      </TextContent>

      <ActionButtons>
        <button style={{ backgroundColor: "#390656", color: "#fff" }}>
          <Link
            to={"/report"}
            style={{
              color: "#fff",
              textDecoration: "none",
              ":hover": { backgroundColor: "#d9d9d9" },
            }}
          >
            Report an Incident
          </Link>
        </button>

        <button style={{ backgroundColor: "#390656", color: "#fff" }}>
          <Link
            to={"/incident-progress/" + userId}
            style={{
              color: "#fff",
              textDecoration: "none",
              ":hover": { backgroundColor: "#d9d9d9" },
            }}
          >
            View Report Progress
          </Link>
        </button>
      </ActionButtons>
    </>
  );
};

export default withAuth(UserMain, "Staff");
