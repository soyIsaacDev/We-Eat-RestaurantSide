import React from "react";
import s from "./Pedido.module.css"

export default function Pedido (props){
    return(
        <div className={s.pedidowrap}>
            <div className={s.cantidad}>{props.cantidad}</div>
            <div className={s.platillo}>{props.platillo}</div>
            <div className={s.estatus}> {props.status}</div>
            <div className={s.notas}> {props.notas}</div>
            <p></p>
        </div>
    )
}