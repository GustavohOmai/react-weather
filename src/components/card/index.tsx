import React from "react";
import IconClima from "../../assets/iconClima.svg"
import './index.css'

function Card() {

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <img src={IconClima} alt="" />
                </div>
                <div className="card-body">
                    <p>Sun</p>
                </div>
            </div>
        </>
    );

}

export default Card;    