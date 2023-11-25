import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

const UserMain = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
    }
  }, []);

  return (
    <>
      <div className="text-content ml-10">
        <h1>Welcome Back!</h1>
        <h2 className="mt-5">To SIIT Cyber Incident Report Database System</h2>
        <h3 className="mt-5">Select what action you want to complete today.</h3>
      </div>
      <div className="action-buttons ml-10 mt-10">
        <button className="p-3 bg-orange-500">
          <Link to={"/report"}>Report an Incident</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/incident-progress"}>View Report Progress</Link>
        </button>
        <button className="p-3 bg-orange-500 ml-2">
          <Link to={"/report-summary"}>Report Summary</Link>
        </button>
      </div>
    </>
  );
};

export default UserMain;
