import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
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
              onChange={handleUserTypeChange}
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="fStaff">Faculty Staff</option>
              <option value="mStaff">Maintenance Staff</option>
            </select>
            <label className="pt-2">Email/Username:</label>
            <input
              className="p-3 rounded"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />

            <label className="pt-2">Password:</label>
            <input
              className="p-3 rounded mb-5"
              type="password"
              value={password}
              onChange={handlePasswordChange}
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
