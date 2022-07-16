import React, { useState} from "react";
import { useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addClienteRestaurant } from "../../Actions/APIMiddleware";

import style from "./agregarCliente.module.css";

export default function AgregarCliente() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  const [input, setInput] = useState({
    nombre: "",  
    usuario: "",     
    contraseña: "",   
    nombreCorp: "Piña",
    nombreRest: "Otro",
    tipo_de_usuario:"Director_General"
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

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addClienteRestaurant(input));
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
        onChange={(e) => handleInputChange(e) }
      />
      <input
        name="contraseña"
        value={input.contraseña}
        placeholder="Contraseña"
        onChange={(e) => handleInputChange(e) }
        type="password"
      />

      {error ? (
        <div className={style.alert}>{error}</div>
      ) : (
        <input type="submit" className={style.submit} />
      )}
    </form>
  );
}
