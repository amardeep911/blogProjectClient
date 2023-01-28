import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.user);
  return user.loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
