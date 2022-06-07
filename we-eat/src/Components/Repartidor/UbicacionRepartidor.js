import React, { useEffect } from "react";

 import { addUbicacionRepartidor } from "../../Actions/APIMiddleware.js";

export default function UbicacionRepartidor(){

	function success(pos) {
		const posicion = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		}
		addUbicacionRepartidor( {"name":"Emilia","ubicacion":posicion} );
		console.log(posicion)
	};

	function error(err) {
		alert('ERROR(' + err.code + '): ' + err.message);
	};

	const options = {
	enableHighAccuracy: false,
	maximumAge:0
	};

	
	if ('geolocation' in navigator){
		navigator.geolocation.watchPosition(success, error, options);
		return <div>Ubicacion</div>
	}
	else {
		return <div>
			<p>Geolocalizacion no disponible en su navegador</p>
			<p>Favor de cambiar de navegador</p>
		</div>
	}
}