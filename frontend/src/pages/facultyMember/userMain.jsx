import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KJUR } from "jsrsasign";
import Axios from "axios";
import withAuth from "../../components/withAuth";

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
      <button onClick={handleLogout}>Log out</button>
      <div className="text-content ml-10">
        <h1>Welcome back, {name}!</h1>
        <h2 className="mt-5">To SIIT Cyber Incident Report Database System</h2>
        <h3 className="mt-5">Select what action you want to complete today.</h3>
      </div>
      <div className="action-buttons ml-10 mt-10">
        <button className="p-3 bg-orange-500">
          <Link to={"/report"}>Report an Incident</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/incident-progress/" + userId}>View Report Progress</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/report-summary"}>Report Summary</Link>
        </button>
      </div>
    </>
  );
};

export default withAuth(UserMain, "Staff");
