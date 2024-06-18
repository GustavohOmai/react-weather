import React from "react"
import './index.css'
import Date from "../date";
import arrowUp from "../../assets/arrowUp.svg"
import arrowDown from "../../assets/arrowDown.svg"

function Temperature() {

    const apiKey: string = import.meta.env.EACT_APP_API_KEY

    console.log(import.meta.env.REACT_APP_API_KEY);

    console.log(import.meta.env.VITE_SOME_KEY)

    console.log(import.meta.env.MODE);
    

    const fetchTemperature = async () => {
        return await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Paris`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }
    
    fetchTemperature()

    return (
        <>
            <div className="total">
                <div className="temperatures">
                    <h1 className="mainTemperature">32°C</h1>
                    <div className="maxMinTemperature">
                        <div className="maxTemperature">
                            <h3>
                                26°C
                            </h3>
                            <span>
                                <img src={arrowUp} alt="Arrow Up" />
                            </span>
                        </div>
                        <div className="minTemperature">
                            <h3>
                                18°C
                            </h3>
                            <span>
                                <img src={arrowDown} alt="Arrow Down" />
                            </span>
                        </div>
                    </div>
                </div>
                <Date />
            </div>
        </>
    );
}

export default Temperature;
