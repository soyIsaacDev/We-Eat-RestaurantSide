import React from "react";
import { Link } from 'react-router-dom';

import s from "./navBar.module.css";

import inicio from "./power-button.png";
import cuenta from "./chef.png";
import restaurantes from "./restaurant.png";
import platillo from "./comida.png";
import usuario from "./cocinero.png";
import pedido from "./take-away.png";

export default function NavBar() {
  return (
      <div className={s.navBar}>
          <button className={s.menu_button}  >
            <img src= {inicio} alt="Inicio" ></img>
          </button>     
          <button className={s.menu_button} >
            <img src= {cuenta} alt="Cuenta"></img>
          </button>
          <Link to="/agregarRestaurant">
            <button className={s.menu_button}>
              <img src= {restaurantes} alt="Restaurantes" ></img>
            </button>
          </Link>
          <Link to ="/agregarplatillo">
            <button className={s.menu_button}>
              <img src= {platillo} alt="Platillo"></img>
            </button>
          </Link>
          {/* <Link to ="/agregarclienterestaurant">
            <button className={s.menu_button}>
              <img src= {usuario} alt="Usuarios"></img>
            </button>
          </Link>
          <Link to ="/pedidos">
            <button className={s.menu_button}>
              <img src= {pedido} alt="pedidos"></img>
            </button>
          </Link> */}
          
      </div>
  );
}