import React from "react";
import { Navigate } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import WithoutLayout from "../screen/WithoutLayout";

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem("token") || "";
  return token ? <Component /> : <Navigate to="/" />
};

export default PrivateRoute;
