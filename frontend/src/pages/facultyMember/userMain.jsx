import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KJUR } from "jsrsasign";
import Axios from "axios";
import withAuth from "../../components/withAuth";
import "./userMain.css";

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
      <div
        className="ml-10 mb-10"
        onClick={handleLogout}
        style={{
          cursor: "pointer",
          color: "#390656",
          position: "relative",
          display: "inline-block",
        }}
      >
        Not you? <span className="underline-slant slanted-text">Log out</span>
      </div>
      <div className="text-content">
        <h1 className="welcome-back">Welcome back, {name}!</h1>
        <h2 className="welcome-back mt-5">
          To SIIT Cyber Incident Report Database System
        </h2>
        <h3 className="welcome-back">
          Select what action you want to complete today.
        </h3>
      </div>
      <div className="action-buttons">
        <button className="p-5 bg-orange-500" style={{ marginRight: "25px" }}>
          <Link to={"/report"} style={{ color: "white" }}>
            Report an Incident
          </Link>
        </button>
        <button className="p-5 bg-orange-500" style={{ marginRight: "15px" }}>
          <Link to={"/incident-progress/" + userId} style={{ color: "white" }}>
            View Report Progress
          </Link>
        </button>
      </div>
    </>
  );
};

export default withAuth(UserMain, "Staff");
