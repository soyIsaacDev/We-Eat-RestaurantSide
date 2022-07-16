import React,{ useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector  } from "react-redux";

import { postLoginSession, postAuth } from "../../Actions/APIMiddleware";

import s from "./signin.module.css";

export default function SignIn(props) {
    const dispatch = useDispatch();
    
    const [input, setInput] = useState({ username: "", password:""});
    const [tipoUsuario, setTipoUsuario] = useState("")
    const loginState = useSelector((state) => state.loginState.autenticated);
    const loginResponse = useSelector((state) => state.loginState.Response);

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
        setTimeout(() => {
            dispatch(postLoginSession(input, tipoUsuario))
        }, 700);
    }
    const location = useLocation();
    console.log(location);
    console.log(loginState);
    console.log(tipoUsuario)
    
    
    return(
        <div className={s.allwrapper}>
            <div className={s.agregarclientes}>
                <Link to={`/AgregarClientes`}  >
                        Obten una cuenta  <span className={s.aqui}>aqui</span> 
                </Link>
            </div>

            <form onSubmit={onSubmit} className={s.form}>
                <div className={s.title}> Bienvenido </div>
                <div className={s.title}> a </div>
                <div className={s.title}> We-Eat </div>
                    <div className={s.respuesta_servidor}>{loginResponse}</div>  
                <input
                    name= 'username'
                    value = {input.username}
                    placeholder="Nombre de Usuario"
                    onChange={(e) =>handleInputChange(e)}
                    className= {s.input}
                />
                <input
                    name= 'password'
                    value = {input.password}
                    placeholder="Contraseña"
                    onChange={(e) =>handleInputChange(e)}
                    className= {s.input}
                    type= "password"
                />
                <select
                    id="tipoUsuario"
                    name="tipoUsuario"
                    value={input.tipoUsuario}
                    onChange={(e) => handleSelectChange(e)}
                    className= {s.select}
                    >
                        <option value="">Tipo de Usuario</option>
                        <option value="Restaurante">Restaurante</option>
                        <option value="Repartidor">Repartidor</option>
                </select>
                
                <input type="submit" className={s.submit}/>

                {loginState === "LoggedIn" ? (
                    tipoUsuario=== "Repartidor"?(
                        <Navigate to="/HomeRepartidor" ></Navigate>
                        ):
                        tipoUsuario=== "Restaurante"?(<Navigate to="/Home" ></Navigate>):(<div></div>)
                    ) 
                : 
                    (
                        <h2 className={s.input_data_h2}>Usuario y contraseña sensible a mayusculas</h2>
                    )
                }

            </form>
        </div>
    )
}