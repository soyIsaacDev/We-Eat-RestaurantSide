import React,{ useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector  } from "react-redux";

import { postLoginSession, postAuth } from "../../Actions/APIMiddleware";

//import style from "";

export default function SignIn(props) {
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({ username: "", password:""});
    const [tipoUsuario, setTipoUsuario] = useState("")
    const loginState = useSelector((state) => state.loginState.autenticated);
    const handleInputChange = function(e){
        setInput({ 
            ...input,  
            [e.target.name] : e.target.value
        });
    }

    const handleSelectChange = function(e){
        setTipoUsuario(e.target.value);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log("en Login Onsubmit --> " + JSON.stringify(input))
        dispatch(postAuth(input))
        dispatch(postLoginSession(input, tipoUsuario));
    }
    const location = useLocation();
    console.log(location);
    console.log(loginState);
    console.log(tipoUsuario)
    
    
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
            {/* <p>Tipo de Usuario</p> */}
            <label>Tipo de Usuario</label>
            <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={input.tipoUsuario}
                onChange={(e) => handleSelectChange(e)}
                >
                    <option value="">Selecciona tu tipo de Usuario</option>
                    <option value="Restaurante">Restaurante</option>
                    <option value="Repartidor">Repartidor</option>
            </select>
            
            <input type="submit" /* className={style.submit} *//>

            {loginState === "LoggedIn" ? (
                tipoUsuario=== "Repartidor"?(
                    <Navigate to="/HomeRepartidor" ></Navigate>
                    ):
                    tipoUsuario=== "Restaurante"?(<Navigate to="/Home" ></Navigate>):(<div></div>)
                ) 
            : 
                (
                    <h2>Favor de llenar tus datos</h2>
                )
            }

        </form>
    )
}