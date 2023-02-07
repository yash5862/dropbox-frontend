import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ Component }) => {
  const token = localStorage.getItem("token") || "";
  return !token ? <Component /> : <Navigate to="/dashboard" />
};

export default AuthRoute;
