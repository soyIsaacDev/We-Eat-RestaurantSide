import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Pedido.module.css"

export default function Pedido (props){
    const pedido = useSelector((state) => state.pedidos);
    const handleClick = function(){

    }
    return(
        <div className={s.pedidowrap}>
            <input type="checkbox" className={s.checkbox}></input>
            <div className={s.cantidad}>{props.cantidad}</div>
            <div className={s.platillo}>{props.platillo}</div>
            <div className={s.estatus}> {props.status}</div>
            <div className={s.notas}> {props.notas}</div>
            <p></p>
        </div>
    )
}