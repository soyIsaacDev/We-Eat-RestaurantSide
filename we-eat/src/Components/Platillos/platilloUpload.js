
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import { getMenu } from "../../Actions/actions";

import style from "./platilloUpload.module.css";

export default function PlatilloUpload() {
    /* const menus = useSelector((state) => state.loadedMenu);
  
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMenu());
    }, []);
    console.log(menus); */

    const [input, setInput] = useState({ 
        nombreMenu:"", nombre: "", descripcion: "", precio:"", /* RestauranteId:"" */
    });
    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const onChangeHandler = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
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
			'http://localhost:4000/restaurantes/agregarPlatillo',
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
	};

    return (
        <form onSubmit={onSubmit}>
            <h1>Registro de Nuevo Platillo</h1>
            <input
                name= 'nombre'
                value = {input.nombre}
                placeholder="Nombre del Platillo"
                onChange={(e) =>handleInputChange(e)}
                className= {style.nombreRest}
            /> 
            <input
                name= "descripcion"
                value={input.descripcion}
                placeholder = "Descripcion"
                onChange={(e) => handleInputChange(e)}
            />
            <input
                name= "precio"
                value= {input.precio}
                placeholder = "Precio"
                onChange={(e) => handleInputChange(e)}
            />
            <label>Menu</label>
            <select
                id="nombreMenu" 
                name="nombreMenu"
                value= {input.nombreMenu}
                onChange={(e) => handleInputChange(e)}
            >
                <option value= "Desayuno">Desayuno</option>.
                <option value= "Comida">Comida</option>
                <option value= "Cena">Cena</option>
                <option value= "Postre">Postre</option>
                <option value= "Bebidas">Bebidas</option>
                 
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
                {/* <button onClick={onSubmit}>Submit</button> */}
            
        </form> 
    )
};