import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { KJUR } from "jsrsasign";

const withAuth = (WrappedComponent, expectedRole) => {
  return (props) => {
    const [navigate, setNavigate] = useState(false);
    const [navigateLogin, setNavigateLogin] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = KJUR.jws.JWS.parse(token);
        if (decodedToken.payloadObj.userType !== expectedRole) {
          setNavigate(true);
        }
      } else {
        setNavigateLogin(true);
      }
    }, []);

    if (navigate) {
      return <Navigate to="/home" />;
    }
    if (navigateLogin) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
