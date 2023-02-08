import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import PrivateRoute from "./components/privateRoute";
import AuthRoute from "./components/authRoute";

const AppRoutes = () => {
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    
  }, []);
  return (
        <Routes>
          {/* AUTH_ROUTE */}
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthRoute Component={Login} />} />      
          <Route path="/signup" element={<AuthRoute Component={Signup} />} />

          <Route path='/dashboard' element={<PrivateRoute Component={Dashboard}/>}/>
        </Routes>
  );
};

export default AppRoutes;
