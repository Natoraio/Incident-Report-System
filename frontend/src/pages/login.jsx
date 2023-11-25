import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, userType);
    Axios.post("http://localhost:8800/api/login", {
      username: username,
      password: password,
      userType: userType,
    })
      .then((response) => {
        console.log(response); // Log the server response to check it
        if (userType == "fStaff") {
          Swal.fire({
            title: "Welcome!",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/home");
        } else if (userType == "handler") {
          Swal.fire({
            title: "Welcome!",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/handler-home");
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
      <div className="ml-12">
        <h1>Welcome!</h1>
        <h3>To SIIT's Cyber Incident Report Management System</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-information flex flex-col mt-5">
            <label className="pt-2">User Type:</label>
            <select
              className="p-3 rounded"
              value={userType}
              onChange={(event) => {
                setUserType(event.target.value);
              }}
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="fStaff">Faculty Staff</option>
              <option value="mStaff">Maintenance Staff</option>
            </select>
            <label className="pt-2">Username:</label>
            <input
              className="p-3 rounded"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            <label className="pt-2">Password:</label>
            <input
              className="p-3 rounded mb-5"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button type="submit" className="bg-orange-500">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
