// Post a Servidor

export function addClienteRestaurant(data){
        async function postData(){
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        console.log(data)
        await fetch('http://localhost:4000/ClienteRestaurantero/agregarclienterestaurantero', requestOptions)
        };
        postData();       
}

export function setUser(user) {
    return { 
        type: "SET_USER",
        payload: user
    };
};

export function postAuth(data){
    return function (dispatch){
        console.log("Ejecutando postAuth");
        dispatch(setUser(data.usuario));
        
        async function postData(){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          };   
          console.log(data) ;
          await fetch('http://localhost:4000/loginrest/password', requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log("Usuario regresado por sesion ->>"+json)                
            });
        };    
        postData();
    }
}

export function getLogginSession(session) {
    return { 
        type: "GET_LOGIN",
        payload: session
    };
};

export function postLoginSession(data){
    return function (dispatch){
        async function postData(){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          };     
          await fetch('http://localhost:4000/sesionrestaurantero', requestOptions)
            .then(response => response.json())
            .then(json => {
                console.log("Session Autenticada"+json);
                dispatch(getLogginSession(json));
            });
        };    
        postData();
    }
}