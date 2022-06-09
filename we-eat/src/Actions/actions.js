// ACTIONS

export function getUser(){
    console.log("GetUser Despachado")
    return function (dispatch){
       return fetch("http://localhost:4000/profile")
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
       return fetch("http://localhost:4000/")
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
       return fetch("http://localhost:4000/restaurantes/corporativo")
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
       return fetch("http://localhost:4000/clienteRestaurantero/clienterestaurantero/"+ restauranteroId)
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
       return fetch("http://localhost:4000/pedidos/pedido/"+RestauranteId)
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
       return fetch("http://localhost:4000/pedidos/cambiarStatus/"+ pedidoId +"/"+status)
           .then(response => response.json())
           .then(json => console.log(JSON.stringify(json))); 
    };
};

export function enviar(reparto, pedidoId){
    console.log(reparto);
    return function (dispatch){
       return fetch("http://localhost:4000/envios/nuevoEnvio/" + reparto +"/" +  pedidoId)
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
        return fetch("http://localhost:4000/pedidos/pedidoAEnvio/" + reparto)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_ENVIOS",
                    payload: json
                }); 
            });
    };
}

export function cambiarReparto(pedidoId, reparto){
    return function (dispatch){
        return fetch("http://localhost:4000/envios/cambiarReparto/"+ pedidoId +"/" + reparto)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_ENVIO_ASIGNADO",
                    payload: json
                }); 
            });
    };
}