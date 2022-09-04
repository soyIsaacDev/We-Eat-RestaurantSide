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
          <Link to="/homemobile" className={s.link_local}>
            <button className={s.menu_button}  >
              Inicio
            </button>
          </Link> 
          <Link to="/agregarRestaurant" className={s.link_local}>
            <button className={s.menu_button}>
              + Restaurantes
            </button>
          </Link>
          <Link to ="/agregarplatillo" className={s.link_local}>
            <button className={s.menu_button}>
              + Platillos
            </button>
          </Link>
          
      </div>
  );
}