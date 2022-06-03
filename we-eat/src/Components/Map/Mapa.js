import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {Wrapper} from "@googlemaps/react-wrapper";

import { setLocation } from "../../Actions/actions";


export default function Mapa(properties) {
    const dispatch = useDispatch();
    const style = { height: properties.height, width:properties.width};
    const inputDiv = useRef(); 
   
    const [map, setMap] = useState(null);
    //const [marker, setMarker] = useState(null);
    
    console.log(map);
    //console.log(marker);
    function handleMap(){
        setMap(
            new window.google.maps.Map(inputDiv.current, {
                center : {lat: 29.08, lng:-110.96},
                zoom : 12,
                gestureHandling: "cooperative"
            })
        )
        
    }
    function addMarker(mapa, loc){
        
            new window.google.maps.Marker({
                position: loc,
                map:mapa,
                draggable:true,
                title: "Aqui estoy mundo!",
              })
        
    }
    useEffect(() => {
      setTimeout(() => {
          handleMap();
      }, 500);
    }, [])

    /* useEffect(() => {
        console.log("Mapa -->>" + map)
        const loc = {lat: 29.08, lng:-111.012893};
        setTimeout(() => {
            addMarker(map, loc);
        }, 300);
      }, [map]); */
      var posicion = 0;

      map? 
      ( map.addListener("click", (mapsMouseEvent) => {
          addMarker(map, mapsMouseEvent.latLng);
          posicion = mapsMouseEvent.latLng;
          dispatch(setLocation(posicion));
          console.log("Posicion Addlistener  "+ JSON.stringify(posicion));
        }))
      :
      (console.log("No Marker"));
      
    
    return (
        <Wrapper apiKey={"AIzaSyAqzcacI8T6cuYGOzIb8dvQUBpKw1HHhEs"}> 
            {map? <div></div> : <div>Loading</div>} 
            <div ref={inputDiv} style = {style} id="map">  
            </div>
        </Wrapper>
      
    );
}