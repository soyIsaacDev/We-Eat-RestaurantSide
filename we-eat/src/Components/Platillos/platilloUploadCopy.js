import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClienteyRestaurantes } from "../../Actions/actions";
import { addPlatillo } from "../../Actions/APIMiddleware";

import style from "./platilloUpload.module.css";

export default function PlatilloUpload() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClienteyRestaurantes(username));
    console.log("Username de useEffect " + username)
  }, []);

  const username = useSelector((state) => state.user.username);
  const restaurantes = useSelector(
    (state) => state.clienteyRestaurantes.Restaurantes
  );
  console.log("Username L20 PlatilloUpload -->>  " + username);
  console.log(restaurantes);

  
  if (restaurantes) {
    console.log("TENGO RESTAURANTES")
    
    const nombreRestaurante = restaurantes[0].nombre;
    console.log(nombreRestaurante)
    const [restdata, setRestdata] = useState({
        nombreMenu: "Comida",
        nombrePlatillo: "",
        descripcion: "",
        precio: "",
        nombreRest: "aiudaaaaa",
      });
    console.log(restdata)

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  
  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
    console.log(restdata);
  };

  const handleInputChange = function(e) {
    setRestdata({
      ...restdata,
      [e.target.name]: e.target.value,
    });
    console.log(restdata);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addPlatillo(selectedFile, restdata));
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Registro de Nuevo Platillo</h1>
      <input
        name="nombrePlatillo"
        value={restdata.nombrePlatillo}
        placeholder="Nombre del Platillo"
        onChange={(e) => handleInputChange(e)}
        className={style.nombreRest}
      />
      <input
        name="descripcion"
        value={restdata.descripcion}
        placeholder="Descripcion"
        onChange={(e) => handleInputChange(e)}
      />
      <input
        name="precio"
        value={restdata.precio}
        placeholder="Precio"
        onChange={(e) => handleInputChange(e)}
      />
      <label>Menu</label>
      <select
        id="nombreMenu"
        name="nombreMenu"
        defaultValue={restdata.nombreMenu}
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
      </select>

      <select
        id="nombreRest"
        name="nombreRest"
        defaultValue = {restdata.nombreRest}
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
      {/* <button onClick={onSubmit}>Submit</button> */}
    </form>
  );
  
  } else if (!restaurantes){
    console.log("SIN RESTAURANTES");

  return (
    <div>Favor de agregar restaurantes a tu cuenta</div>
    );
  }
  
  
  
  /* restaurantes ? (
    restaurantes.length > 1 ? (
        setInput(
            {...input,
            nombreRest : restaurantes[0].nombre}
        )
    ) : (
        console.log("Solo 1 Restaurante")
    )
  ) : (
    console.log("Aqui negativo")
  ) */
  
}
