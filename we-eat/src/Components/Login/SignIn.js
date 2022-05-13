import React,{ useState,useEffect } from "react";
import { loginSession } from "../../Actions/postFunctions";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector  } from "react-redux";

import { getUser } from "../../Actions/actions";
import { postLoginSession, postAuth } from "../../Actions/postFunctions";

//import style from "";

export default function SignIn(props) {
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({ username: "", password:""});
    const [auth, setAuth] = useState({ username: ""});
    const loginState = useSelector((state) => state.loginState.autenticated);
    const handleInputChange = function(e){
        
        setInput({ 
            ...input,  
            [e.target.name] : e.target.value
        });
        setAuth({ 
            ...auth,  
            username : e.target.value
        });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log("en Login Onsubmit --> " + JSON.stringify(input))
        dispatch(postAuth(input, auth))
        dispatch(postLoginSession(auth));
    }
    const location = useLocation();
    console.log(location);
    console.log(loginState);
    
    return(
        <form onSubmit={onSubmit}>
            <input
                name= 'username'
                value = {input.username}
                placeholder="Nombre de Usuario"
                onChange={(e) =>handleInputChange(e)}
                /* className= {style.nombreRest} */
            />
            <input
                name= 'password'
                value = {input.password}
                placeholder="Contraseña"
                onChange={(e) =>handleInputChange(e)}
                /* className= {style.nombreRest} */
                type= "password"
            />
            <input type="submit" /* className={style.submit} *//>

            {loginState === "LoggedIn" ? (
                <Navigate to="/Home" ></Navigate>
                ): (
                <h2>Usuario o Contraseña Incorrecta</h2>
                )}

        </form>
    )
}