import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addClienteRestaurant, postAuth, setUser } from "../../Actions/postFunctions";
//import {getRestaurants, getCorporativo} from "../../Actions/actions";

import style from "./agregarCliente.module.css";

export default function AgregarCliente() {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const restaurants = useSelector((state) => state.loadedRestaurants);
  const corporativos = useSelector((state) => state.corporativo);
  
  const [input, setInput] = useState({
    nombre: "",
    usuario: "",  
    contraseña: "",   
    nombreCorp: "dsad",
    nombreRest: "sadas",
    tipo_de_usuario:"Director_General"
  });
  const [auth, setAuth] = useState({
    usuario: "",  
    contraseña: ""
  });
  const [error, setError] = useState(true);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    

    if (input.nombre && input.usuario && input.contraseña !== "") {
      setError(false);
    } else {
      setError("Favor de llenar todos los datos");
    }
  };

  const handleAuthChange= function(e){
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
    console.log(auth);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    addClienteRestaurant(input);
    dispatch(setUser(auth.usuario))
    //dispatch(postAuth(auth));
    navigate("/Home", { replace: true });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Bienvenido a We Eat</h1>
      <h3>Por favor agrega tus datos</h3>
      <input
        name="nombre"
        value={input.nombre}
        placeholder="Nombre"
        onChange={(e) => handleInputChange(e) }
      />
      <input
        name="usuario"
        value={input.usuario}
        placeholder="Usuario"
        onChange={(e) => handleInputChange(e) + handleAuthChange(e)}
      />
      <input
        name="contraseña"
        value={input.contraseña}
        placeholder="Contraseña"
        onChange={(e) => handleInputChange(e) + handleAuthChange(e)}
        type="password"
      />

      {/* <select 
        id="nombreRest" 
        name="nombreRest"
        value= {input.nombreRest}
        onChange={(e) => handleInputChange(e)}
        > 
          {restaurants.map((restaurant) => {
            return(
              <option key = {restaurant.nombre} value={restaurant.nombre}>{restaurant.nombre}</option>
            )
          })}           
      </select>

      <select 
        id="nombreCorp" 
        name="nombreCorp"
        value= {input.nombreCorp}
        onChange={(e) => handleInputChange(e)}
        > 
          {corporativos.map((corporativo) => {
            return(
              <option key = {corporativo.nombre} value={corporativo.nombre}>{corporativo.nombre}</option>
            )
          })}           
      </select> */}

      <select 
        id="tipo_de_usuario" 
        name="tipo_de_usuario"
        value= {input.tipo_de_usuario}
        onChange={(e) => handleInputChange(e)}
        >
          <option value="Director_General">Director General</option>
          <option value="Gerente_Regional">Gerente Regional</option>
          <option value="Gerente_Restaurant">Gerente Restaurant</option>
          <option value="Cajero">Cajero</option>
          <option value="Cocinero">Cocinero</option>
      </select>

      {error ? (
        <div className={style.alert}>{error}</div>
      ) : (
        <input type="submit" className={style.submit} />
      )}
    </form>
  );
}
