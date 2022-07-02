// Post a Servidor
const host = "https://weeatapi.herokuapp.com";

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
        await fetch(`${host}/ClienteRestaurantero/agregarclienterestaurantero`, requestOptions)
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

export function postAuth(data){
    return function (dispatch){
        console.log("Ejecutando postAuth");
        const auth = {"username": data.username}
        console.log("Ejecutando postAuth -username --> "+ auth);
        dispatch(setUser(auth));
        
        async function postData(){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          };   
          console.log(data) ;
          await fetch(`${host}/authcliente/login/password`, requestOptions)
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

export function postLoginSession(data, tipoUsuario){
    return function (dispatch){
        async function postData(){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          };     
          console.log(data)
          if(tipoUsuario === "Restaurante" ){
            await fetch(`${host}/authrestaurantero/sesionrestaurantero`, requestOptions)
            .then(response => response.json())
            .then(json => {
                dispatch(getLogginSession(json))
                console.log("Session Autenticada L-83 APIMiddleware"+JSON.stringify(json))
            });
          }
          else{
            await fetch(`${host}/authrepartidor/SesionRepartidor`, requestOptions)
            .then(response => response.json())
            .then(json => {
                dispatch(getLogginSession(json))
                console.log("Session Autenticada L-83 APIMiddleware"+JSON.stringify(json))
            });
          } 
        };    
        postData();
    };
};

export function addPlatillo(file, input){
    return function (dispatch){
        async function postFormData(){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify(input));
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            await fetch(`${host}/restaurantes/agregarPlatillo`,
                {
                    method: 'POST',
                    body: formData,
                }
            )
            .then((response) => response.json())
            .then((result) => { console.log(result);  })
            .catch((error) => {
                    console.error('Error al agregar la Imagen:', error);
            });       
        }
        postFormData();
              
    };
};

export function addRepartidor(data){
    async function postData(){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };
      await fetch(`${host}/repartidor/nuevoRepartidor`, requestOptions)
      };
      postData();       
}

export function addUbicacionRepartidor(data){
    async function postUbicacion(){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };
      await fetch(`${host}/repartidor/ubicacionRepartidor`, requestOptions)
      };
      postUbicacion();       
}