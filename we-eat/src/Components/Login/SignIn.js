import React,{ useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector  } from "react-redux";

import { postLoginSession, postAuth } from "../../Actions/APIMiddleware";

//import style from "";

export default function SignIn(props) {
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({ username: "", password:""});
    const loginState = useSelector((state) => state.loginState.autenticated);
    const handleInputChange = function(e){
        setInput({ 
            ...input,  
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log("en Login Onsubmit --> " + JSON.stringify(input))
        dispatch(postAuth(input))
        dispatch(postLoginSession(input));
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