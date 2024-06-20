import React from "react";
import './index.css'

interface CardProps {
    date: string;
    icon: string;
}

function Card({ date, icon }: CardProps) {

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <img src={icon} alt="" />
                </div>
                <div className="card-body">
                    <p>{date}</p>
                </div>
            </div>
        </>
    );

}

export default Card;    