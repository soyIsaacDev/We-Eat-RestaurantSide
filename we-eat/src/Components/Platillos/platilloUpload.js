import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPlatillo } from "../../Actions/APIMiddleware";

import style from "./platilloUpload.module.css";

export default function PlatilloUpload() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const loading = useSelector((state) => state.loading);
  console.log("LOADING  "+loading)
  const restaurantes = useSelector(
    (state) => state.clienteyRestaurantes.Restaurantes
  );
  console.log("Username L20 PlatilloUpload -->>  " + username);
  const [input, setInput] = useState({
    nombreMenu: "Desayuno",
    nombrePlatillo: "",
    descripcion: "",
    precio: "",
    nombreRest: "",
  });
  //ParaTesteo
  /* const [input, setInput] = useState({
    nombreMenu: "Desayuno",
    nombrePlatillo: "Langosta a la Mantequilla",
    descripcion: "Cola de Langosta preparada con Mantequilla",
    precio: 350,
    nombreRest: "",
  });

  console.log(restaurantes);
  console.log(input) */

  useEffect(() => {
    if(restaurantes){
      setInput(
        {...input,
        nombreRest : restaurantes[0].nombre}
      )
    }
  }, [restaurantes]);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  if (loading) { 
    return (
      <div>Loading</div>
    )
  }

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
    console.log(input);
  };

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addPlatillo(selectedFile, input));
    navigate("/Home", { replace: true });
  };
  
    return (
      <form onSubmit={onSubmit}>
        <h1>Registro de Nuevo Platillo</h1>
        <input
          name="nombrePlatillo"
          value={input.nombrePlatillo}
          placeholder="Nombre del Platillo"
          onChange={(e) => handleInputChange(e)}
          className={style.nombreRest}
        />
        <input
          name="descripcion"
          value={input.descripcion}
          placeholder="Descripcion"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          name="precio"
          value={input.precio}
          placeholder="Precio"
          onChange={(e) => handleInputChange(e)}
        />
        <label>Menu</label>
        {/* <select
          id="nombreMenu"
          name="nombreMenu"
          defaultValue={input.nombreMenu}
          onChange={(e) => handleInputChange(e)}
        >
          <option value="Desayuno">Desayuno</option>.
          <option value="Comida">Comida</option>
          <option value="Cena">Cena</option>
          <option value="Brunch">Brunch</option>
          <option value="Ensalada">Ensalada</option>
          <option value="Sopa">Sopa</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Postre">Postre</option>
        </select> */}

        <select
          id="nombreRest"
          name="nombreRest"
          value = {input.nombreRest}
          onChange={(e) => handleInputChange(e)}
        >
          {restaurantes.map((restaurant) => {
            return (
              <option key={restaurant.nombre} value={restaurant.nombre}>
                  {restaurant.nombre}
              </option>
              );       
          })}
        </select>
        
        <input
          type="file"
          name="file"
          onChange={onChangeHandler}
          className={style.file}
        />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filtype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate: {""}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p> Seleccione una foto de su Restaurante</p>
        )}
  
        <input type="submit" className={style.submit} />
      </form>
    );
  
  
}
