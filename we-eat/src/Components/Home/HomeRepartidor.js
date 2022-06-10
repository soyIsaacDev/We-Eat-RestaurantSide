import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { cambiarStatus, buscarEnvio, cambiarReparto, buscarEnvioAceptado, 
  buscarRepartidor, cambiarStatusRepartidor, buscarEnvioAceptadoXRepartidor } from '../../Actions/actions';

import NavBarRepartidor from "../NavBar/NavBarRepartidor";
import s from "./Home.module.css";

export default function Home() {

  const usuario = useSelector((state) => state.loginState);
  const repartidor = useSelector((state) => state.repartidor);
  const pedido = useSelector((state) => state.envios);
  const pedidoAsignado = useSelector((state) => state.envioAsignado);
  const [estado, setEstado] = useState(true);
  const dispatch = useDispatch();
  var asignado = 0;


  useEffect(() => {
    dispatch(buscarRepartidor(usuario.id));
  }, []);

 /*  useEffect(() => {
    dispatch(buscarEnvioAceptadoXRepartidor(repartidor.id))
  }, [repartidor]); */
  
  useEffect(() => {
    console.log(repartidor.estatus);
    dispatch(buscarEnvioAceptadoXRepartidor(repartidor.id))
    const interval = setInterval(() => {
      buscarEnviosaReparto();
    }, 1000);
    return () => clearInterval(interval);
    
  }, [repartidor]);

  const buscarEnviosaReparto = function(){
    if(repartidor){
      if(repartidor.estatus === "Pausa"){
        console.log(repartidor.estatus); 
      }
      if(repartidor.estatus === "Activo"){
        console.log(repartidor.estatus); 
        dispatch(buscarEnvio("Buscando Repartidor"));
      }
    }
  }
  
  

  const cambiarAAceptarReparto = function(e, p){
    //p.status = "Aceptado"
    asignado = 1;
    dispatch(cambiarReparto(p.Envio.id, "Aceptado", repartidor.id ))
    dispatch(cambiarStatusRepartidor(usuario.id,"Repartiendo"))
    dispatch(buscarEnvioAceptado(p.Envio.id));
    dispatch(buscarRepartidor(usuario.id));
    setEstado(!estado);
  }

  const avisarLlegada = function(e, p){
    p.status = "Entregado"
    dispatch(cambiarReparto(p.Envio.id, "Entrega_Lista",  repartidor.id ))
    setEstado(!estado);
  }

  const cambiarAEntregado = function(e, p){
    p.status = "Entregado"
    dispatch(cambiarStatus(p.Envio.id, "Entregado" ))
    dispatch(cambiarReparto(p.Envio.id, "Entregado",  repartidor.id ))
    setEstado(!estado);
  }

  if(pedidoAsignado){
    
    if(pedidoAsignado[0]){
      if(pedidoAsignado[0].id){
        console.log(pedidoAsignado)
        const p = pedidoAsignado[0]
        console.log(p);
        return(
          <div>
            <div className={s.pedidowrap}>
                    <div className={s.cantidad}>{p.cantidad}</div>
                    <div className={s.platillo}> {p.Platillos[0].nombre}</div>
                    <div className={s.platillo}> {p.Restaurantes[0].direccion}</div>
                    
                    <button className={s.boton} onClick={(e) => avisarLlegada(e,p)}>Avisar Llegada</button>
              </div> 
          </div>
      )
      }
      return (
        <div>
          <h1>Bienvenido a We-Eat</h1>
          <p></p>
          <p></p>
          <NavBarRepartidor></NavBarRepartidor>
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
          </div>
         )
      
      
    }
    return (
      <div>
        <h1>Bienvenido a We-Eat</h1>
        <p></p>
        <p></p>
        <NavBarRepartidor></NavBarRepartidor>
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
        </div>
       )
  }
  else{
    
    return (
      <div>
        <h1>Bienvenido a We-Eat</h1>
        <p></p>
        <p></p>
        <NavBarRepartidor></NavBarRepartidor>
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
        </div>
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
}