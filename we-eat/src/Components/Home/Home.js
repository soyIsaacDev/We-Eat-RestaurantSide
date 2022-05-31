import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getPedidos, getClienteyRestaurantes } from '../../Actions/actions';
import NavBar from "../NavBar/NavBar";
import Pedido from "../Pedidos/pedido";
import s from "./Home.module.css";

export default function Home() {

  const restauranteroId = useSelector((state) => state.loginState.ClienteRestauranteroId);
  const restaurant = useSelector((state) => state.clienteyRestaurantes.Restaurantes);
  const pedido = useSelector((state) => state.pedidos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClienteyRestaurantes(restauranteroId));
  }, []);
  useEffect(() => {
    //First run tu load pedidos 
    if(restaurant){
      if(restaurant.length){
      dispatch(getPedidos(restaurant[0].id));
      }
    }
    // To keep looking for New Orders after loading
    const interval = setInterval(() =>{
      if(restaurant){
        if(restaurant.length){
        dispatch(getPedidos(restaurant[0].id));
        }
      }
    }, 30000);
    return() => clearInterval(interval);
    
  }, [restaurant]);

  
  return (
    <div>
      <h1>Bienvenido a We-Eat</h1>
      <p></p>
      <p></p>
      <NavBar></NavBar>
      <p></p>
      <h2> Pedidos</h2>
      <p></p>
      <div className={s.titulowrap}>
        <div className={s.cantidad}>Cantidad</div>
        <div className={s.platillo}>Platillo</div>
        <div className={s.estatus}>Estatus de Pedido</div>
        <div className={s.notas}>Notas </div>          
      </div>
      {pedido.map((p) =>{
        return(
          <Pedido cantidad = {p.cantidad} status = {p.status} notas = {p.notas}  platillo = {p.Platillos[0].nombre}></Pedido>
        )
      })}
    </div>
   )
}