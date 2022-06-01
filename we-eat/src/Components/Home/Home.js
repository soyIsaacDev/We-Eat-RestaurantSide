import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getPedidos, getClienteyRestaurantes, recibirPedido, cambiarStatus } from '../../Actions/actions';
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";

export default function Home() {

  const restauranteroId = useSelector((state) => state.loginState.ClienteRestauranteroId);
  const restaurant = useSelector((state) => state.clienteyRestaurantes.Restaurantes);
  const pedido = useSelector((state) => state.pedidos);
  const [estado, setEstado] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClienteyRestaurantes(restauranteroId));
  }, []);

  useEffect(() => {
    //First run tu load Orders
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

  useEffect(() => {
    pedido.map((p) =>{
      if(p.status==="Colocado"){
        dispatch(cambiarStatus(p.id, "Recibido" ));
      }
    })
  },[pedido])

  const cambiarAEnProceso = function(e, p){
    p.status = "En_Proceso"
    dispatch(cambiarStatus(p.id, "En_Proceso" ))
    setEstado(!estado);
  }

  const cambiarAListo = function(e, p){
    p.status = "Listo"
    dispatch(cambiarStatus(p.id, "Listo" ))
    setEstado(!estado);
  }
  
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
        <div className={s.cantidad}>Pedido</div>
        <div className={s.cantidad}>Cantidad</div>
        <div className={s.platillo}>Platillo</div>
        <div className={s.estatus}>Estatus de Pedido</div>
        <div className={s.notas}>Notas </div>   
        <div className={s.boton}></div>      
      </div>
      <p></p>
      <div>Recibidos</div>
      <p></p>
      {pedido.map((p) =>{
        console.log(p.status);
        if(p.status === "Recibido"){
          return(
            <div className={s.pedidowrap}>
              <div className={s.cantidad}>{p.id}</div>
              <div className={s.cantidad}>{p.cantidad}</div>
              <div className={s.platillo}>{p.Platillos[0].nombre}</div>
              <div className={s.estatus}> {p.status}</div>
              <div className={s.notas}> {p.notas}</div>
              <button className={s.boton} onClick={(e) => cambiarAEnProceso(e,p)}>Procesar</button>
            </div>          
          )
        }
      })}
      <p></p>
      <div>En Proceso</div>
      <p></p>
      {pedido.map((p) =>{
        console.log(p.status);
        if(p.status === "En_Proceso"){
          return(
            <div className={s.pedidowrap}>
              <div className={s.cantidad}>{p.id}</div>
              <div className={s.cantidad}>{p.cantidad}</div>
              <div className={s.platillo}>{p.Platillos[0].nombre}</div>
              <div className={s.estatus}> {p.status}</div>
              <div className={s.notas}> {p.notas}</div>
              <button className={s.boton} onClick={(e) => cambiarAListo(e,p)}>Listo</button>
            </div>          
          )
        }
      })}

    </div>
   )
}