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
    console.log("Settienado Loading")
    return { 
        type: "LOADING"
    };
};

export function getClienteyRestaurantes (usuario){
    return function (dispatch){
       return fetch("http://localhost:4000/clienterestaurantero/user?usuario="+ usuario)
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