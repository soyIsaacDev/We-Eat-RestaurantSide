import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
 
import AgregarRestaurant from "./Components/Restaurant/restaurantUpload";
import AgregarPlatillo from "./Components/Platillos/platilloUpload"
import AgregarDetallesRestaurant from "./Components/RestDetails/restDetailsUpload";
import AgregarClientes from "./Components/Clientes/agregarCliente";
import ProtectedRoutes from "./ProtectedRoutes";
import Signin from "./Components/Login/SignIn"   
import Home from "./Components/Home/Home";
import Map from "./Components/Map/Mapa";
import Repartidor from "./Components/Repartidor/Repartidor";
import UbicacionRepartidor from "./Components/Repartidor/UbicacionRepartidor";
import HomeRepartidor from "./Components/Home/HomeRepartidor";
import HomeRepartidorModificada from "./Components/Home/HomeRepartidor2";
function App() { 

  return (
    <div className="App">
        <React.Fragment>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route exact path="/AgregarClientes" element = { <AgregarClientes/> } />
            <Route exact path="/AgregarRepartidor" element = { <Repartidor/> } />
            <Route exact path="/UbicacionRepartidor" element = { <UbicacionRepartidor/> } />
            <Route path="/map" element={<Map />} />
            
                        
            <Route element={<ProtectedRoutes />}>
                <Route path="/cambioHomeRepartidor" element = {<HomeRepartidorModificada/>}/>
                <Route exact path="/Home" element = { <Home/> } />
                <Route exact path="/HomeRepartidor" element = { <HomeRepartidor/> } />
                <Route exact path="/agregarRestaurant" element = { <AgregarRestaurant/> } />
                <Route exact path="/agregarPlatillo" element = { <AgregarPlatillo/> } />
                <Route exact path="/agregarDetallesRestaurant" element = { <AgregarDetallesRestaurant/> } />
                
            </Route>
        </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
