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
} from "../../Actions/actions";

import NavBarRepartidor from "../NavBar/NavBarRepartidor";
import s from "./HomeRep.module.css";

export default function HomeRepartidor() {
  const usuario = useSelector((state) => state.loginState);
  const repartidor = useSelector((state) => state.repartidor);
  const envios = useSelector((state) => state.envios);
  const envioAsignado = useSelector((state) => state.envioAsignado);
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

  //StatusReparto !== "Entregado"

  useEffect(() => {
    console.log(repartidor.estatus);
    dispatch(buscarEnvioAceptadoXRepartidor(repartidor.id));

    if (
      (hayEnvioAsignado === 0 && hayEnvioAsignado2 === 0) ||
      StatusReparto === "Entregado"
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
  var cambioBoton = 987;

  const cambiarAAceptarReparto = function(e, p) {
    //p.status = "Aceptado"
    dispatch(cambiarReparto(p.Envio.id, "Aceptado", repartidor.id));
    dispatch(cambiarStatusRepartidor(usuario.id, "Repartiendo"));
    dispatch(buscarEnvioAceptado(p.Envio.id));
    dispatch(buscarRepartidor(usuario.id));
    setEstado(!estado);
  };

  const avisarLlegadaARestaurante = function(e, p) {
    //NOTAAAA:   -->>   Agregar Status EntregadoXRestaurante a modelo Envios
    //dispatch(cambiarReparto(p.Envio.id, "Entrega_Lista",  repartidor.id ))
    dispatch(cambiarReparto(p.Envio.id, "En_Restaurante", repartidor.id));
    dispatch(buscarEnvioAceptado(p.Envio.id));
    setEstado(!estado);
  };

  const recibirEnvio = function(e, p) {};

  const avisarLlegadaCliente = function(e, p) {};

  const cambiarAEntregado = function(e, p) {
    p.status = "Entregado";
    dispatch(cambiarStatus(p.Envio.id, "Entregado"));
    dispatch(cambiarReparto(p.Envio.id, "Entregado", repartidor.id));
    setEstado(!estado);
  };

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
      {StatusReparto !== "Entregado"}
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
              // No esta funcionando ya que cambioBoton se resetea cada que se renderiza; tendria que ver
              //  como hacer el switch dentro de una funcion para tener acceso solo en el scope de la funcion
              switch (cambioBoton) {
                case 1:
                  cambioBoton = 2;
                  console.log("Cambio Boton  "+cambioBoton);
                  return (
                    <button className={s.boton} onClick={(e) => avisarLlegadaARestaurante(e, pedidoAEntregar) }>
                      Llegada a Restaurante
                    </button>
                  );
                /* case "Llegada a Restaurante":
                textoBoton = "Recibir Envio";
                return(<button className={s.boton} onClick={(e) => avisarLlegadaARestaurante(e,pedidoAEntregar)}>{textoBoton}</button>); */
                /* case "Llegada a Restaurante":
                  textoBoton = "Llegada con Cliente";
                  return (
                    <button
                      className={s.boton}
                      onClick={(e) => avisarLlegadaCliente(e, pedidoAEntregar)}
                    >
                      {textoBoton}
                    </button>
                  );
                case "Llegada con Cliente":
                  textoBoton = "Entregado";
                  return (
                    <button
                      className={s.boton}
                      onClick={(e) => avisarLlegadaCliente(e, pedidoAEntregar)}
                    >
                      {textoBoton}
                    </button>
                  ); */
                default:
                  cambioBoton = 1;
                  return (
                    <button
                      className={s.boton}
                      onClick={(e) =>
                        cambiarAAceptarReparto(e, pedidoAEntregar)
                      }
                    >
                      Aceptar Envio
                    </button>
                  );
              }
            })()}
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
