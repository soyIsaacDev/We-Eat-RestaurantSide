import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getPedidos, getClienteyRestaurantes } from '../../Actions/actions';
import NavBar from "../NavBar/NavBar";
//import style from "./Home.module.css";


export default function Home() {
  const restauranteroId = useSelector((state) => state.loginState.ClienteRestauranteroId);
  const restaurant = useSelector((state) => state.clienteyRestaurantes.Restaurantes);
  
  //const pedidos = useSelector((state) => state.loadedPedidos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClienteyRestaurantes(restauranteroId));
  }, []);

  if(restaurant){
    console.log(restaurant[0].id)
    //dispatch(getPedidos(restaurant[0].id));
  }
  return (
    <div>
      <h1>Bienvenido a We-Eat</h1>
      <NavBar></NavBar>

    </div>
   )
}