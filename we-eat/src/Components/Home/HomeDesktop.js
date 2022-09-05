import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPedidos, getClienteyRestaurantes, cambiarStatus, enviar } from '../../Actions/actions';
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";

export default function Home() {

  const restauranteroId = useSelector((state) => state.loginState.ClienteRestauranteroId);
  const restaurant = useSelector((state) => state.clienteyRestaurantes.Restaurantes);
  const pedido = useSelector((state) => state.pedidos);
  const envio = useSelector((state)=> state.envios);
  const [estado, setEstado] = useState(true);
  const dispatch = useDispatch();
  const [media, setMedia] = useState(false);
  let navigate = useNavigate();
  
  window
    .matchMedia("(width < 600px)")
    .addEventListener('change', e => setMedia( e.media ));
    {media && ( navigate("/HomeMobile", { replace: true }) )}

  useEffect(() => {
    //Para saber que restaurant es
    dispatch(getClienteyRestaurantes(restauranteroId));
  }, []);

  useEffect(() => {
    //First run tu load Orders
    if(restaurant){
      if(restaurant.length){
      dispatch(getPedidos(restaurant[0].id));
      setEstado(!estado);
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

  // Cambiar automaticamente el Status del pedido a Recibido
  useEffect(() => {
    console.log(pedido);
    pedido.map((p) =>{
      if(p.status==="Colocado"){
        dispatch(cambiarStatus(p.id, "Recibido" ));
        // Y mostrarlo
        setTimeout(() => {
          dispatch(getPedidos(restaurant[0].id));
        }, 200);
      }
    })
  },[pedido])
  

  const cambiarAEnProceso = function(e, p){
    p.status = "En_Proceso"
    dispatch(cambiarStatus(p.id, "En_Proceso" ))
    setEstado(!estado);
  }

  const enviarAReparto= function(e, p){
    dispatch(enviar("Buscando Repartidor", p.id));
    setTimeout(() => {
      dispatch(getPedidos(restaurant[0].id));
    }, 100);
    setEstado(!estado);
  }

  const cambiarAListo = function(e, p){
    p.status = "Listo"
    dispatch(cambiarStatus(p.id, "Listo" ))
    setTimeout(() => {
      dispatch(getPedidos(restaurant[0].id));
    }, 1500);
    setTimeout(() => {
      dispatch(getPedidos(restaurant[0].id));
    }, 7000);
    setEstado(!estado);
  }

  const cambiarAEnReparto = function(e, p){
    p.reparto = "En_Camino"
    dispatch(cambiarStatus(p.id, "En_Camino" ))
    setTimeout(() => {
      dispatch(getPedidos(restaurant[0].id));
    }, 100);
    setEstado(!estado);
  }
    
  return (
    <div className={s.all}>
      <h1 className={s.header_title}>Bienvenido a We-Eat</h1>
      <p></p>
      <p></p>
      <NavBar></NavBar>
      <p></p>
      <h2 className={s.header_subtitle}> Pedidos</h2>
      <p></p>
      <section className={s.grid_header}>

        <div className={s.cantidad}>Pedido</div>
        <div className={s.cantidad}>Cantidad</div>
        <div className={s.platillo}>Platillo</div>
        <div className={s.notas}>Notas </div> 
        <div className={s.reparto}>Reparto</div>  
        <div className={s.boton_proceso} style={{visibility: "hidden"}}></div> 
             
      </section>

      <div className={s.title_proceso}>Recibidos</div>
      {pedido.map((p) =>{
        if(p.status === "Recibido"){
          return(
            <div>
              
              <div className={s.pedido_proceso_section}>
                <div className={s.cantidad}>{p.id}</div>
                <div className={s.cantidad}>{p.cantidad}</div>
                <div className={s.platillo}>{p.Platillos[0].nombre}</div>
                <div className={s.notas}> {p.notas}</div>
                <div className={s.reparto}></div>
                <button className={s.boton_proceso} onClick={(e) => cambiarAEnProceso(e,p)}>Procesar</button>
              </div>   
            </div>       
          )
        }
      })}

      <div className={s.title_proceso}>En Proceso</div>
      {pedido.map((p) =>{
        if(p.status === "En_Proceso"){ // NOTA: agregar condicion de reparto para cambiar rapidamente el tipo de boton
          return(
            <div className={s.pedido_proceso_section}>
              <div className={s.cantidad}>{p.id}</div>
              <div className={s.cantidad}>{p.cantidad}</div>
              <div className={s.platillo}>{p.Platillos[0].nombre}</div>
              <div className={s.notas}> {p.notas}</div>
              <div className={s.reparto}></div>
              {/* Dependiendo del Status de Reparto */}
              {!p.Envio? 
                <div className={s.enviowrap}>
                  <div className={s.reparto_e}></div>
                                                    {/* Aun sin Reparto -> Buscar un Repartidor */}
                  <button className={s.boton_e} onClick={(e) => enviarAReparto(e,p)}>Enviar</button>
                </div>
                :(
                  <div className={s.enviowrap}>
                    <div className={s.reparto_e}>{p.Envio.reparto}</div>
                                                  {/* Ya se encuentra con Repartidor Asignado -> Pasar a Envio Listo */}
                    <button className={s.boton_e} onClick={(e) => cambiarAListo(e,p)}>Listo</button>
                </div>
              )}
            </div>          
          )
        }
      })}

      <div className={s.title_proceso}>Listo</div>
      {pedido.map((p) =>{
        if(p.status === "Listo"){
          return(
            <div className={s.pedido_proceso_section}>
              <div className={s.cantidad}>{p.id}</div>
              <div className={s.cantidad}>{p.cantidad}</div>
              <div className={s.platillo}>{p.Platillos[0].nombre}</div>
              <div className={s.notas}> {p.notas}</div>
              <div className={s.reparto}>{p.Envio.reparto}</div>
              {p.Envio.reparto === "En_Restaurante"? 
                <div className={s.enviowrap}>
                  <button className={s.boton_e} onClick={(e) => cambiarAEnReparto(e,p)}>Entregar</button>
                </div> 
              :
              <div className={s.enviowrap}>
                <div className={s.boton_e}></div> 
              </div>
              }
            </div>          
          )
        }
      })}

    </div>
   )
}