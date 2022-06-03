// based on https://www.pluralsight.com/guides/uploading-files-with-reactjs
// and https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Mapa from "../Map/Mapa";

import style from "./restautantUpload.module.css";

export default function Restaurant() {
    let navigate = useNavigate();;
    /* const [input, setInput] = useState({ 
        nombre: "", direccion: "", area_de_reparto:"", actividad:"Abierto", estatus:"Activo",
        nombreCorp:"",  direccionCorp:"", costoEnvio: "", horarios: "", tipoComida:"Desayuno", usuario:"",
    }); */
    //PARA TESTEO
    const [input, setInput] = useState({ 
        nombre: "Cedron", direccion: "Condesa", area_de_reparto:3, actividad:"Abierto", estatus:"Activo",
        nombreCorp:"Cedron",  direccionCorp:"Condesa", costoEnvio: 25, horarios: "9-12", tipoComida:"Desayuno", usuario:"",
        location: ""
    });
    console.log(input)
    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const usuario = useSelector((state)=>state.user.username);
    const location = useSelector((state)=> state.location);
    console.log(usuario);
    
    
    useEffect(() => {
        console.log(location);
        setInput({
            ...input,
            location
        }); 
        console.log(input);
    }, [location]);
    

    const onChangeHandler = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
        setInput({
            ...input,
            usuario
        }); 
        console.log(input)
    }

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        console.log(input)
      }

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
		formData.append('file', selectedFile);
        formData.append('data', JSON.stringify(input));
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
         }

        await fetch(
			'http://localhost:4000/restaurantes/agregarRestaurante',
			{
				method: 'POST',
                body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.error('Error al agregar la Imagen:', error);
			});
        navigate("/Home", { replace: true });
	};

    return (
        <form onSubmit={onSubmit} className={style.restaurantform}>
            <h1>Registro de Nuevo Restaurant</h1>
            <input
                name= 'nombre'
                value = {input.nombre}
                placeholder="Nombre del Restaurante"
                onChange={(e) =>handleInputChange(e)}
                className= {style.nombreRest}
            /> 
            <input
                name= "direccion"
                value={input.direccion}
                placeholder = "Direccion"
                onChange={(e) => handleInputChange(e)}
            />
            <Mapa height = "70vh" width = "80vw"></Mapa>
            <input
                name= "area_de_reparto"
                value= {input.area_de_reparto}
                placeholder = "Area de Reparto en Km"
                onChange={(e) => handleInputChange(e)}
            />
            <label>Estatus de Actividad</label>
            <select 
                id="actividad" 
                name="actividad"
                value= {input.actividad}
                onChange={(e) => handleInputChange(e)}
            >
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
                <option value="Pausa">Pausa</option>
            </select>
            <label>Estatus de Registro</label>
            <select 
                id="estatus" 
                name="estatus"
                value= {input.estatus}
                onChange={(e) => handleInputChange(e)}
            >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="En_Registro">En Registro</option>
                <option value="En_Baja">Baja</option>
            </select>
            <input
                name= "nombreCorp"
                value= {input.nombreCorp}
                placeholder="Nombre del Corporativo"
                onChange={(e) => handleInputChange(e)}
            />
            <input
                name= "costoEnvio"
                value={input.costoEnvio}
                placeholder="Costo de Envio"
                onChange={(e) => handleInputChange(e)}
            />
            <input
                name= "horarios"
                value={input.horarios}
                placeholder="Horarios"
                onChange={(e) => handleInputChange(e)}
            />
            <label>Tipo de Comida</label>
            <select 
                id="tipoComida" 
                name="tipoComida"
                value= {input.tipoComida}
                onChange={(e) => handleInputChange(e)}
            >
                <option value="Desayuno">Desayuno</option>
                <option value="Desayuno y brunch">Desayuno y brunch</option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
                <option value="Ensaladas">Ensaladas</option>
            </select>

            <input type="file" name="file" onChange={onChangeHandler} className={style.file}/>
            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filtype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate: {''}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ):(
               <p> Seleccione una foto de su Restaurante</p> 
            )}
            
                <input type="submit" className={style.submit}/>
            
        </form> 
    )
};