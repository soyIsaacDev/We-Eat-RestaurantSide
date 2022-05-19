import React from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";

export default function ProtectedRoutes() {
  /* 
  
  
  ---------  Short Circuit to bypass bug that doesn´t render correctly Outlet  ------

  */
  const isAuth = useSelector((state) => state.loginState.autenticated);
  
  //const isAuth = "LoggedIn";


  const location = useLocation();
  
 return isAuth==="LoggedIn" ? (
    <Outlet /> // Renders the next match in an array that matches the current Location
  ) : (
    <Navigate to="/" replace state={{ from: location }} />  // setting Location state
  );
}


