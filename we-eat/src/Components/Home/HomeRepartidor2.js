import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cambiarStatus,
  buscarEnvio,
  cambiarReparto,
  buscarEnvioAceptado,
  buscarRepartidor,
  cambiarStatusRepartidor,
  buscarEnvioAceptadoXRepartidor,
  clearEnvios
} from "../../Actions/actions";

import NavBarRepartidor from "../NavBar/NavBarRepartidor";
import s from "./HomeRep.module.css";

export default function HomeRepartidor() {
  const usuario = useSelector((state) => state.loginState);
  const repartidor = useSelector((state) => state.repartidor);
  const envios = useSelector((state) => state.envios);
  const envioAsignado = useSelector((state) => state.envioAsignado);
  const [cambioBoton, setCambioBoton] = useState(9);
  const [estado, setEstado] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarRepartidor(usuario.id));
  }, []);

  // para revisar si hay envios ya asignados; si el array = 0 es que NO hay envio asignado
  var hayEnvioAsignado = Array.isArray(envios) && envios.length;
  var hayEnvioAsignado2 = Array.isArray(envioAsignado) && envioAsignado.length;
  var pedidoAEntregar = 0;
  console.log("Envios Asignados  " + hayEnvioAsignado + hayEnvioAsignado2);
  console.log("Envios  " + JSON.stringify(envios));
  console.log("Envio Asignado  " + JSON.stringify(envioAsignado[0]));
  //                                               :
  hayEnvioAsignado > 0 && hayEnvioAsignado2 === 0
    ? //Hay envios Buscando Repartidor; Mapear de envios
      envios.map((env) => {
        pedidoAEntregar = env;
      })
    : // Hay envio ya Asignado; datos estan en envioAsignado
      (pedidoAEntregar = envioAsignado[0]);
  console.log(pedidoAEntregar);

  var StatusReparto = 0;
  pedidoAEntregar
    ? (StatusReparto = pedidoAEntregar.Envio.reparto)
    : (StatusReparto = 0);
  console.log(StatusReparto);

  useEffect(() => {
    console.log(repartidor.estatus);
    dispatch(buscarEnvioAceptadoXRepartidor(repartidor.id));

    if (
      (hayEnvioAsignado === 0 && hayEnvioAsignado2 === 0) 
      || StatusReparto === "Entregado" 
      || hayEnvioAsignado === false && hayEnvioAsignado2 === 0
      || hayEnvioAsignado === 0 && hayEnvioAsignado2 === false
    ) {
      console.log("Envios Asignados " + hayEnvioAsignado + hayEnvioAsignado2);
      const interval = setInterval(() => {
        buscarEnviosaReparto();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [repartidor, hayEnvioAsignado, hayEnvioAsignado2]);

  const buscarEnviosaReparto = function() {
    if (repartidor) {
      if (repartidor.estatus === "Pausa") {
        console.log(repartidor.estatus);
      }
      if (repartidor.estatus === "Activo") {
        console.log(repartidor.estatus);
        dispatch(buscarEnvio("Buscando Repartidor"));
      }
    }
  };

  //var botondeAviso = cambiarAAceptarReparto;

  const cambiarAAceptarReparto = function(e, p) {
    //p.status = "Aceptado"
    StatusReparto="Aceptado";
    dispatch(cambiarReparto(p.Envio.id, "Aceptado", repartidor.id));
    dispatch(cambiarStatusRepartidor(usuario.id, "Repartiendo"));
    dispatch(buscarEnvioAceptado(p.Envio.id));
    dispatch(buscarRepartidor(usuario.id));
    dispatch(clearEnvios());
    setEstado(!estado);
  };

  const avisarLlegadaARestaurante = function(e, p) {
    //NOTAAAA:   -->>   Agregar Status EntregadoXRestaurante a modelo Envios
    //dispatch(cambiarReparto(p.Envio.id, "Entrega_Lista",  repartidor.id ))
    StatusReparto="En_Restaurante";
    dispatch(cambiarReparto(p.Envio.id, "En_Restaurante", repartidor.id));
    dispatch(buscarEnvioAceptado(p.Envio.id));
    setEstado(!estado);
  };

  const recibirEnvio = function(e, p) {
    StatusReparto="Recibido";
    dispatch(cambiarReparto(p.Envio.id, "Recibido", repartidor.id));
    dispatch(buscarEnvioAceptado(p.Envio.id));
  };
  /* const cambiarARepartiendo = function(e, p) {
    setCambioBoton(3);
    dispatch(cambiarReparto(p.Envio.id, "Repartiendo", repartidor.id));
    dispatch(buscarEnvioAceptado(p.Envio.id));
  }; */

  const avisarLlegadaCliente = function(e, p) {
    StatusReparto="Repartiendo";
    setCambioBoton(4);
    dispatch(cambiarReparto(p.Envio.id, "Repartiendo", repartidor.id));
    dispatch(buscarEnvioAceptado(p.Envio.id));
  };

  const cambiarAEntregado = function(e, p) {
    StatusReparto="Entregado";
    pedidoAEntregar = null;
    console.log("Se cambio a Entregado" + pedidoAEntregar);
    dispatch(cambiarStatus(p.Envio.id, "Entregado"));
    dispatch(cambiarReparto(p.Envio.id, "Entregado", repartidor.id));
    dispatch(buscarEnvioAceptado(p.Envio.id));
    dispatch(cambiarStatusRepartidor(usuario.id, "Activo"));
    
    setEstado(!estado);
  };

  console.log(pedidoAEntregar)

  return (
    <div>
      <NavBarRepartidor></NavBarRepartidor>
      <div className={s.pedido}> Pedido</div>
      <div className={s.titulowrap}>
        <div className={s.cantidad}>Cantidad</div>
        <div className={s.platillo}>Platillo</div>
        <div className={s.platillo}>Direccion Restaurante</div>
        <div className={s.boton}></div>
      </div>

      {pedidoAEntregar ? (
        <div className={s.pedidowrap}>
          <div className={s.cantidad}>{pedidoAEntregar.cantidad}</div>
          <div className={s.platillo}>
            {" "}
            {pedidoAEntregar.Platillos[0].nombre}
          </div>
          <div className={s.platillo}>
            {" "}
            {pedidoAEntregar.Restaurantes[0].direccion}
          </div>
          <div>

          {(() => {
              switch (StatusReparto) {
                case "Aceptado":
                  return (
                    <button className={s.boton} onClick={(e) => avisarLlegadaARestaurante(e, pedidoAEntregar) }>
                      Llegada a Restaurante
                    </button>
                  );
                  case "En_Restaurante":
                  return (
                    <button className={s.boton} onClick={(e) => recibirEnvio(e, pedidoAEntregar) }>
                      Recibir Envio
                    </button>
                  );
                  case  "Recibido":  //Cambiar en Modelo a Repartiendo
                  return (
                    <button className={s.boton} onClick={(e) => avisarLlegadaCliente(e, pedidoAEntregar) }>
                      Llegada Cliente
                    </button>
                  );
                  case "Repartiendo": //Cambiar en Modelo a Entregando
                  return (
                    <button className={s.boton} onClick={(e) => cambiarAEntregado(e, pedidoAEntregar) }>
                      Entregar
                    </button>
                  );
                  case  "Entregado":
                  return (
                    <div></div>
                  );
                default:
                  return (
                    <button className={s.boton} onClick={(e) =>cambiarAAceptarReparto(e, pedidoAEntregar) }>
                      Aceptar Envio
                    </button>
                  );
              }
            })()}
            
            {/* {(() => {
              switch (cambioBoton) {
                case 1:
                  return (
                    <button className={s.boton} onClick={(e) => avisarLlegadaARestaurante(e, pedidoAEntregar) }>
                      Llegada a Restaurante
                    </button>
                  );
                  case 2:
                  return (
                    <button className={s.boton} onClick={(e) => recibirEnvio(e, pedidoAEntregar) }>
                      Recibir Envio
                    </button>
                  );
                  case 3:
                  return (
                    <button className={s.boton} onClick={(e) => avisarLlegadaCliente(e, pedidoAEntregar) }>
                      Llegada con Cliente
                    </button>
                  );
                  case 4:
                  return (
                    <button className={s.boton} onClick={(e) => cambiarAEntregado(e, pedidoAEntregar) }>
                      Entregar
                    </button>
                  );
                default:
                  return (
                    <button className={s.boton} onClick={(e) =>cambiarAAceptarReparto(e, pedidoAEntregar) }>
                      Aceptar Envio
                    </button>
                  );
              }
            })()} */}

          </div>
        </div>
      ) : (
        <div> Sin Envio Asignado </div>
      )}
    </div>
  );
}
