import React from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "./layout";

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem("token") || "";
  return token ? <Layout><Component /></Layout> : <Navigate to="/" />
};

export default PrivateRoute;
