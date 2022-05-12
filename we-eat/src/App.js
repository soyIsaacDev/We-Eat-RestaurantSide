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

function App() { 

  return (
    <div className="App">
        <React.Fragment>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route exact path="/AgregarClientes" element = { <AgregarClientes/> } />
                        
            <Route element={<ProtectedRoutes />}>
                
                <Route exact path="/Home" element = { <Home/> } />
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
