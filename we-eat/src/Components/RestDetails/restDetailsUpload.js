
import React, { useState } from "react";

import style from "./restDetailsUpload.module.css";

export default function RestaurantDetails() {
    
    const [input, setInput] = useState({ 
        menu: "", platillo: ""
    });
    console.log(input)
    
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
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
         }
         
		await fetch(
			'http://localhost:4000/restaurantes/agregarDetallesRestaurante',
			{
				method: 'POST',
                headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(input),
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Se agrego el restaurante correctamente:', result);
			})
			.catch((error) => {
				console.error('Error al agregar restaurante:', error);
			});
	};

    return (
        <form onSubmit={onSubmit}>
            <h1>Registro de Detalles Restaurante</h1>
            <input
                name= 'menu'
                value = {input.menu}
                placeholder="Menu"
                onChange={(e) =>handleInputChange(e)}
                className= {style.nombreRest}
            /> 
            <input
                name= "platillo"
                value={input.platillo}
                placeholder = "Platillo"
                onChange={(e) => handleInputChange(e)}
            />
            {/* <label>Estatus de Actividad</label>
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
            */}
                <input type="submit" className={style.submit}/>
                {/* <button onClick={onSubmit}>Submit</button> */}
            
        </form> 
    )
};