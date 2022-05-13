import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import { getLoginSession, getUser } from "../../Actions/actions";

export default function Home() {
  var loginState  = useSelector((state) => state.loginState);
  
  /* const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []); */
  
  return (
    <div>
      <h1>Bienvenido a We-Eat</h1>
      <NavBar></NavBar>
    </div>
   )
}