import React, { useState } from "react";

import s from "./filter.module.css";
import down from "./arrow-downe.png";
import up from "./up-arrow.png";

export default function restaurant_card() {
  // Estos mantienen los estados de para mostrar las opciones de los botones de filtrado
    const [showOrden, setShowOrden] = useState(true);
    const [showPrecios, setShowPrecios] = useState(true);
    const [showEnvio, setShowEnvio] = useState(true);
    const [showDieta, setShowDieta] = useState(true);

    return (
      <div className={s.filter}>
            {/* Este es el primer filtro por tipo de restaurante, debe venir de Store */}
        <div className={s.title}>Tipos de Restaurantes</div>
            {/* cambio el estado de mostrar o no boton y en base a eso se muestran los filtros 
                y el nombre del boton con el icono hacia arriba o hacia abajo */}
        <button className={s.orden} onClick={() => setShowOrden((prev) => !prev)}>
          {showOrden ? 
            (<div className={s.ordentitlewrap}>
              <div className={s.ordentitle}>Ordenar</div>
              <img className={s.ordentitleicon} src={down} alt = "icono desplegar hacia abajo"></img>
            </div>
            )
            :(
              <div className={s.ordentitlewrap}>
                <div className={s.ordentitle}>Ordenar</div>
                <img className={s.ordentitleicon} src={up} alt = "icono desplegar hacia arriba"></img>
              </div>
            )
          }
        </button>
          {showOrden ? ("") : ( 
              <div> 
              <button className={s.filtrosorden}>Mas Popular</button>
              <button className={s.filtrosorden}>Calificacion</button>
              <button className={s.filtrosorden}>Tiempo de Entrega</button>
              </div>
          )}

        <button className={s.orden} onClick={() => setShowPrecios((prev) => !prev)}>
          {showPrecios ? 
            (<div className={s.ordentitlewrap}>
              <div className={s.ordentitle}>Rango de Precios</div>
              <img className={s.ordentitleicon} src={down} alt = "icono desplegar hacia abajo"></img>
            </div>
            )
            :(
              <div className={s.ordentitlewrap}>
                <div className={s.ordentitle}>Rango de Precios</div>
                <img className={s.ordentitleicon} src={up} alt = "icono desplegar hacia arriba"></img>
              </div>
            )
          }
        </button>

        {showPrecios ? ("") : ( 
              <div> 
              <button className={s.rangoprecios}>$</button>
              <button className={s.rangoprecios}>$$</button>
              <button className={s.rangoprecios}>$$$</button>
              <button className={s.rangoprecios}>$$$$</button>
              </div>
          )}

        <button className={s.orden} onClick={() => setShowEnvio((prev) => !prev)}>
          {showEnvio ? 
            (<div className={s.ordentitlewrap}>
              <div className={s.ordentitle}>Costo de envío máx</div>
              <img className={s.ordentitleicon} src={down} alt = "icono desplegar hacia abajo"></img>
            </div>
            )
            :(
              <div className={s.ordentitlewrap}>
                <div className={s.ordentitle}>Costo de envío máx</div>
                <img className={s.ordentitleicon} src={up} alt = "icono desplegar hacia arriba"></img>
              </div>
            )
          }
        </button>

        {showEnvio ? ("") : ( 
              <div> 
              <button className={s.cenvios}>$20</button>
              <button className={s.cenvios}>$25</button>
              <button className={s.cenvios}>$30</button>
              <button className={s.cenvios}>$30+</button>
              </div>
          )}

<button className={s.orden} onClick={() => setShowDieta((prev) => !prev)}>
          {showDieta ? 
            (<div className={s.ordentitlewrap}>
              <div className={s.ordentitle}>Tipo de Dieta</div>
              <img className={s.ordentitleicon} src={down} alt = "icono desplegar hacia abajo"></img>
            </div>
            )
            :(
              <div className={s.ordentitlewrap}>
                <div className={s.ordentitle}>Tipo de Dieta</div>
                <img className={s.ordentitleicon} src={up} alt = "icono desplegar hacia arriba"></img>
              </div>
            )
          }
        </button>

        {showDieta ? ("") : ( 
              <div> 
              <button className={s.tdieta}>Vegetariana</button>
              <button className={s.tdieta}>Vegana</button>
              <button className={s.tdieta}>Sin Gluten</button>
              <button className={s.tdieta}>Keto</button>
              </div>
          )}
          
      </div>
  );
}

