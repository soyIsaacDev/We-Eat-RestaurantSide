// Post a Servidor

export function addClienteRestaurant(data){
    return function (dispatch){
        async function postData(){
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        console.log(data)
        const auth = {
            username: data.usuario,  
            password: data.contraseña
          }
          console.log(auth);
          const user = {
            username: data.usuario
          }
          
          console.log(user);
        await fetch('http://localhost:4000/ClienteRestaurantero/agregarclienterestaurantero', requestOptions)
        .then(json => dispatch(postAuth(auth, user)))
        };
        postData();       

    }
}

export function setUser(user) {
    return { 
        type: "SET_USER",
        payload: user
    };
};

export function postAuth(data, auth){
    return function (dispatch){
        console.log("Ejecutando postAuth");
        console.log("Ejecutando postAuth -username --> "+ auth);
        dispatch(setUser(auth));
        
        async function postData(){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          };   
          console.log(data) ;
          await fetch('http://localhost:4000/loginrest/password', requestOptions)
            /* .then(response => response.json())
            .then(json => {
                console.log("Sesion ESTABLECIDA")                
            })
            .then(json=> dispatch(postLoginSession(auth))); */
        };    
        postData();
    }
}

export function getLogginSession(session) {
    console.log("getLogginSession postFunctions L-48 -->>  "+JSON.stringify(session))
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
          console.log(data)
          await fetch('http://localhost:4000/sesionrestaurantero', requestOptions)
            .then(response => response.json())
            .then(json => {
                dispatch(getLogginSession(json))
                console.log("Session Autenticada"+JSON.stringify(json))
            }
            );  
        };    
        postData();
    }
}