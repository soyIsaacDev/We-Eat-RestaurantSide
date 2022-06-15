import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { buscarRepartidor, cambiarStatusRepartidor } from '../../Actions/actions';

import s from "./navBarRepartidor.module.css";



export default function NavBarRepartidor() {

  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.loginState);

  const buscarPedidos = function(e){
    dispatch(cambiarStatusRepartidor(usuario.id, "Activo"));
    dispatch(buscarRepartidor(usuario.id));
    //enBuscaDeEnvios()
  }

  const pausarPedidos = function(e){
    dispatch(cambiarStatusRepartidor(usuario.id, "Pausa"));
    dispatch(buscarRepartidor(usuario.id));
    //stopBusquedaEnvios();
  }

  const loggOut = function(e){
    dispatch(cambiarStatusRepartidor(usuario.id, "Pausa"));
    dispatch(buscarRepartidor(usuario.id));

  }

  /* let interval = 0;
  const enBuscaDeEnvios = function(){
    //enviar Ubicacion del Repartidor    
      interval = setInterval(() => {
        console.log("Buscar Envio")
        //dispatch(buscarEnvio("Buscando Repartidor"));
      }
          
      , 600);
  }

  function stopBusquedaEnvios (){
    console.log("Pausar Busqueda")
    return() => clearInterval(interval)
  } */

  return (
      <div className={s.navBar}>
          <div className={s.bienvenido}>Bienvenido a We-Eat</div>
          <button className={s.menu_button} onClick={(e) => buscarPedidos(e)}  >
            Buscar Pedidos
          </button>     
          <button className={s.menu_button} onClick={(e) => pausarPedidos(e)}>
            Pausar Pedidos
          </button>
          <button className={s.menu_button} onClick={(e) => loggOut(e)} >
            Salir
          </button>
          
      </div>
  );
}