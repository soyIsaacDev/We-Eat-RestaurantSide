import React from "react";
import { Link } from 'react-router-dom';

import s from "./navBar.module.css";

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