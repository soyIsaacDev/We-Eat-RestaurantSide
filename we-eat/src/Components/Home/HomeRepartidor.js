import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { cambiarStatus, buscarEnvio, cambiarReparto } from '../../Actions/actions';
import s from "./Home.module.css";

export default function Home() {

  const repartidor = useSelector((state) => state.loginState);
  const pedido = useSelector((state) => state.envios);
  const [estado, setEstado] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    //First run tu load Orders
    dispatch(buscarEnvio("Buscando Repartidor"));
    
    // To keep looking for Orders after loading
    const interval = setInterval(() =>{
        dispatch(buscarEnvio("Buscando Repartidor"));
    }, 30000);
    
    return() => clearInterval(interval);
  }, []);

  const cambiarAAceptarReparto = function(e, p){
    //p.status = "Aceptado"
    dispatch(cambiarReparto(p.Envio.id, "Aceptado" ))
    dispatch(buscarEnvio("Aceptado"));
    setEstado(!estado);
  }

  const avisarLlegada = function(e, p){
    p.status = "Entregado"
    dispatch(cambiarReparto(p.Envio.id, "Entrega_Lista" ))
    setEstado(!estado);
  }

  const cambiarAEntregado = function(e, p){
    p.status = "Entregado"
    dispatch(cambiarStatus(p.Envio.id, "Entregado" ))
    dispatch(cambiarReparto(p.Envio.id, "Entregado" ))
    setEstado(!estado);
  }
  
  return (
    <div>
      <h1>Bienvenido a We-Eat</h1>
      <p></p>
      <p></p>
      <h2> Pedido</h2>
      <p></p>
      <p></p>
      <div className={s.titulowrap}>
        <div className={s.cantidad}>Cantidad</div>
        <div className={s.platillo}>Platillo</div>
        <div className={s.platillo}>Direccion Restaurante</div>
        <div className={s.boton}></div>      
      </div>
      <p></p>
      {console.log(pedido)};
      {pedido? <div></div> : <div></div>}
      {pedido.map((p) =>{
        console.log(p.status);
        if(p.Envio.reparto === "Buscando Repartidor"){
          return(
            <div className={s.pedidowrap}>
              <div className={s.cantidad}>{p.cantidad}</div>
              <div className={s.platillo}> {p.Platillos[0].nombre}</div>
              <div className={s.platillo}> {p.Restaurantes[0].direccion}</div>
              
              <button className={s.boton} onClick={(e) => cambiarAAceptarReparto(e,p)}>Aceptar Reparto</button>
            </div>          
          )
        }}
        )
      }


        {/* if(p.Envio.reparto === "Aceptado"){
            return(
              <div className={s.pedidowrap}>
                <div className={s.cantidad}>{p.cantidad}</div>
                <div className={s.platillo}> {p.Platillos[0].nombre}</div>
                <div className={s.platillo}> {p.Restaurantes[0].direccion}</div>
                
                <button className={s.boton} onClick={(e) => avisarLlegada(e,p)}>Avisar Llegada</button>
              </div>          
            )
          }
          if(p.Envio.reparto === "Entrega_Lista"){
            return(
              <div className={s.pedidowrap}>
                <div className={s.cantidad}>{p.cantidad}</div>
                <div className={s.platillo}> {p.Platillos[0].nombre}</div>
                <div className={s.platillo}> {p.Restaurantes[0].direccion}</div>
                
                <button className={s.boton} onClick={(e) => cambiarAEntregado(e,p)}>Entregar</button>
              </div>          
            )
          } */}
    </div>
   )
}