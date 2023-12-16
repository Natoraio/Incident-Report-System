import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { KJUR } from "jsrsasign";

const withAuth = (WrappedComponent, expectedRole) => {
  return (props) => {
    const [isHandler, setIsHandler] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isBoth, setIsBoth] = useState(false);
    const [correctRole, setCorrectRole] = useState(false); // ["Incident handler", "Staff"
    const [navigateLogin, setNavigateLogin] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = KJUR.jws.JWS.parse(token);
        console.log("expected role is " + expectedRole);
        console.log(decodedToken.payloadObj.userType);
        if (decodedToken.payloadObj.userType != expectedRole) {
          console.log("Im here");
          if (expectedRole == "Incident handler") {
            setIsHandler(true);
            console.log("Im here 13333");
          } else if (expectedRole == "Staff") {
            console.log("Im here 2");
            setIsStaff(true);
          } else if (expectedRole == "StaffAndHandler") {
            console.log("Im here BOTH ROLES");
            setIsBoth(true);
          }
        } else {
          setCorrectRole(true);
        }
      } else {
        setNavigateLogin(true);
      }
    }, []);

    if (navigateLogin) {
      return <Navigate to="/login" />;
    }

    console.log("correct role is " + correctRole);

    if (!correctRole) {
      console.log("Im here 3");
      if (isHandler) {
        console.log("Im here 4");
        return <Navigate to="/home" />;
      } else if (isStaff) {
        return <Navigate to="/handler-home" />;
      }
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
