import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addRepartidor } from "../../Actions/APIMiddleware";

export default function Repartidor() {
  let navigate = useNavigate();

  const [input, setInput] = useState({
    nombre: "",
    usuario:"", 
    contraseña:"", 
    estatus:"Pausa"
  })
  
  /*
  Testeo
  useEffect(() => {
    addRepartidor({ nombre:"Jorge Duran", usuario:"jduran", contraseña:"11", estatus:"Activo" });      
  }, []); */

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addRepartidor(input);
    navigate("/", { replace: true });
  };
  
  return (
    <form onSubmit={onSubmit}>
    <h1>Registro de Nuevo Repartidor</h1>
    <input
      name="nombre"
      value={input.nombre}
      placeholder="Nombre Completo"
      onChange={(e) => handleInputChange(e)}
      //className={style.nombreRest}
    />
    <input
      name="usuario"
      value={input.usuario}
      placeholder="Usuario"
      onChange={(e) => handleInputChange(e)}
      //className={style.nombreRest}
    />
    <input
        name="contraseña"
        value={input.contraseña}
        placeholder="contraseña"
        onChange={(e) => handleInputChange(e)}
        type="password"
      />
    <input type="submit"  />
    </form>
    
  );
}
