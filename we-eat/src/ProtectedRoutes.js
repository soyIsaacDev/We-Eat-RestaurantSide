import React from "react";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./App";
import {  useDispatch, useSelector } from "react-redux";

import { getLogginSession } from "./Actions/postFunctions";

export default function ProtectedRoutes() {
  /* 
  
  
  ---------  Short Circuit to bypass bug that doesn´t render correctly Outlet  ------

  */
  //const isAuth = useSelector((state) => state.loginState.autenticated);
  const isAuth = "LoggedIn";


  const location = useLocation();
  
 return isAuth==="LoggedIn" ? (
    <Outlet /> // Renders the next match in an array that matches the current Location
  ) : (
    <Navigate to="/" replace state={{ from: location }} />  // setting Location state
  );
}


