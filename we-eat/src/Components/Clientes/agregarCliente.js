import React, { useState} from "react";
import { useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addClienteRestaurant } from "../../Actions/APIMiddleware";

import s from "./agregarCliente.module.css";

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
    <form onSubmit={onSubmit} className={s.form}>
      <section className={s.title_area}>
        <h1 className={s.title}>Bienvenido a We Eat</h1>
        <h3 className={s.subtitle}>Por favor agrega tus datos</h3>
      </section>
      
      <section className={s.input_area}>
        <input
          name="nombre"
          value={input.nombre}
          placeholder="Nombre"
          onChange={(e) => handleInputChange(e) }
          className= {s.input}
        />
        <input
          name="usuario"
          value={input.usuario}
          placeholder="Usuario"
          onChange={(e) => handleInputChange(e) }
          className= {s.input}
        />
        <input
          name="contraseña"
          value={input.contraseña}
          placeholder="Contraseña"
          onChange={(e) => handleInputChange(e) }
          type="password"
          className= {s.input}
        />
      </section>
      
      <section className={s.error_area}>
        {error ? (
          <div className={s.alert}>{error}</div>
        ) : (
          <input type="submit" className={s.submit} />
        )}
      </section>


    </form>
  );
}
