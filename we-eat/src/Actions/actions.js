// ACTIONS

/* const host = "https://weeatapi.herokuapp.com";
const localhost = "http://localhost:4000"; */
import { host } from "../host";

export function getUser(){
    console.log("GetUser Despachado")
    return function (dispatch){
       return fetch(`${host}/profile`)
           .then(response => response.json())
           .then(json => {
               console.log("respuesta getUser"+json)
               dispatch({
                   type: "SET_USER",
                   payload: json
               }); 
           });
    };
}

export function loginEstado() {
    return { 
        type: "SET_LOGIN"
    };
};

export function getLoginSession(){
    return function (dispatch){
        console.log("getLoginSession")
       return fetch(`${host}`)
           .then(response => response.json())
           .then(json => {
               console.log("Respuesta Session -->>>"+JSON.stringify(json))
               dispatch({
                   type: "GET_LOGIN",
                   payload: json
               }); 
           });
    };
}

export function getCorporativo(){
    return function (dispatch){
       return fetch(`${host}/restaurantes/corporativo`)
           .then(response => response.json())
           .then(json => {
               console.log(json)
               dispatch({
                   type: "GET_CORPORATIVO",
                   payload: json
               }); 
           });
    };
}

export function setLoading() {
    console.log("Seteando Loading")
    return { 
        type: "LOADING"
    };
};

export function getClienteyRestaurantes (restauranteroId){
    console.log("GETCLIENTE Y RESTAURANTES EJECUTADO")
    return function (dispatch){
       return fetch(`${host}/clienteRestaurantero/clienterestaurantero/`+ restauranteroId)
           .then(response => response.json())
           .then(json => {
               console.log("Respuesta de getClienteyRestaurantes   "+json)
               dispatch({
                   type: "GET_CLIENTEYRESTAURANTES",
                   payload: json
               }); 
               dispatch(setLoading());
           });
    };
}

export function getPedidos(RestauranteId ){
console.log("GET PEDIDOS EJECUTADO")
    return function (dispatch){
       return fetch(`${host}/pedidos/pedido/`+RestauranteId)
           .then(response => response.json())
           .then(json => {
               dispatch({
                   type: "GET_PEDIDOS",
                   payload: json
               }); 
           });
    };
}


export function cambiarStatus( pedidoId, status){
    return function (dispatch){
       return fetch(`${host}/pedidos/cambiarStatus/`+ pedidoId +"/"+status)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json))); 
    };
};

export function enviar(reparto, pedidoId){
    console.log(reparto);
    return function (dispatch){
       return fetch(`${host}/envios/nuevoEnvio/` + reparto +"/" +  pedidoId)
           .then(response => response.json())
           .then(json => {
            /* dispatch({
                type: "GET_ENVIOS",
                payload: json
            });  */
        }); 
    };
};

export function setLocation(location) {
    return { 
        type: "LOCATION",
        payload: location
    };
};

export function buscarEnvio(reparto){
    return function (dispatch){
        return fetch(`${host}/pedidos/pedidoAEnvio/` + reparto)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_ENVIOS",
                    payload: json
                }); 
            });
    };
}

export function cambiarReparto(pedidoId, reparto, RepartidorId){
    return function (dispatch){
        return fetch(`${host}/envios/cambiarReparto/`+ pedidoId +"/" + reparto +"/"+RepartidorId)
            .then(response => response.json())
            .then(json => console.log(json))
    };
}

export function buscarEnvioAceptado(envioId){
    return function (dispatch){
        return fetch(`${host}/pedidos/pedidoEnReparto/` + envioId)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_ENVIO_ASIGNADO",
                    payload: json
                }); 
            });
    };
}

export function buscarRepartidor(repartidorId){
    return function (dispatch){
        return fetch(`${host}/repartidor/buscarRepartidor/` + repartidorId)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_REPARTIDOR",
                    payload: json
                }); 
            });
    };
}

export function cambiarStatusRepartidor(idRepartidor, status){
    return function (dispatch){
        return fetch(`${host}/repartidor/cambiarStatusRepartidor/`+ idRepartidor +"/" + status)
            .then(response => response.json())
            .then(json => console.log(json))
    };
}

export function buscarEnvioAceptadoXRepartidor(RepartidorId){
    return function (dispatch){
        return fetch(`${host}/pedidos/pedidoEnEntrega/` + RepartidorId)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_ENVIO_ASIGNADO",
                    payload: json
                }); 
            });
    };
}

export function clearEnvios(){
    return function (dispatch){
        dispatch({
            type: "GET_ENVIOS",
            payload: ""
        }); 
    };
}