import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";

const AppRoutes = () => {
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    
  }, []);
  return (
        <Routes>
          {/* AUTH_ROUTE */}
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />      
          <Route path="/signup" element={<Signup />} />

          <Route path='dashboard' element={<Dashboard />}/>
        </Routes>
  );
};

export default AppRoutes;
