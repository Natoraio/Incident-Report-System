import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import loginBG from "./loginBG.jpg";
import logo from "./logo-siit.png";

const GlobalStyle = createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
  }

  body {
    justify-content: center;
    background-image: url(${loginBG});
    background-size: cover;
    font-family: 'Kanit', sans-serif;
  }
`;

const LoginContainer = styled.div`
  width: 40vw; 
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  color: black;
  background-color: rgba(255, 255, 255, 0.8);
  
`;


const Input = styled.input`
  width: 100%;
  background-color: #ffffff;
`;

const Select = styled.select`
  width: 100%;
  background-color: #ffffff;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #6f2da8;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

const Logo = styled.img`
  width: 200px; 
  height: auto; 
  margin-top: 10px;
  margin-bottom: 10px; 
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if ((username, password, userType == "")) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    e.preventDefault();
    console.log(username, password, userType);
    Axios.post("http://localhost:8800/api/login", {
      userType: userType,
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response); // Log the server response to check it
        if (response.data.success) {
          sessionStorage.setItem("token", response.data.token);
          Swal.fire({
            title: "Welcome!",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          if (userType == "Staff") {
            navigate("/home");
          }
          if (userType == "Incident handler") {
            navigate("/handler-home");
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: "Login failed. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Login failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <Logo src={logo} alt="Your Logo" />
        <h1>Welcome!</h1>
        <h2>To SIIT's Cyber Incident Report Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-information flex flex-col">
            <label className="pt-2">User Type:</label>
            <Select
              value={userType}
              onChange={(event) => {
                setUserType(event.target.value);
              }}
            >
              <option value="">Select User Type</option>
              <option value="Staff">Faculty Staff</option>
              <option value="Incident handler">Incident Handler</option>
            </Select>
            <label className="pt-2">Username:</label>
            <Input
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            <label className="pt-2">Password:</label>
            <Input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <Button type="submit">Login</Button>
        </form>
      </LoginContainer>
    </>
  );
};

export default Login;
