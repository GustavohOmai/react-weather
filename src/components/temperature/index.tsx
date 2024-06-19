import React, { useEffect, useState } from "react"
import './index.css'
import Date from "../date";
import arrowUp from "../../assets/arrowUp.svg"
import arrowDown from "../../assets/arrowDown.svg"

function Temperature() {
    const apiKey: string = import.meta.env.VITE_REACT_APP_API_KEY

    const [temperature, setTemperature] = useState(null);
    const [maxTemperature, setMaxTemperature] = useState(null);
    const [minTemperature, setMinTemperature] = useState(null);

    const fetchTemperature = async () => {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Paris&days=1&aqi=no&alerts=no`);
            const data = await response.json();
            console.log(data);
            return {
                temperature: data.current.temp_c,
                maxTemperature: data.forecast.forecastday[0].day.maxtemp_c,
                minTemperature: data.forecast.forecastday[0].day.mintemp_c
            };
        } catch (error) {
            console.error('Erro ao buscar temperatura:', error);
            return null;
        }
    }
    
    
    useEffect(() => {
        const getTemperature = async () => {
            const result = await fetchTemperature();
            if (result) {
                setTemperature(result.temperature);
                setMaxTemperature(result.maxTemperature);
                setMinTemperature(result.minTemperature);
            }
        };
        getTemperature();
    }, []);
    

    return (
        <>
            <div className="total">
                <div className="temperatures">
                    <h1 className="mainTemperature"> {temperature}°C  </h1>
                    <div className="maxMinTemperature">
                        <div className="maxTemperature">
                            <h3>
                                {maxTemperature}°C
                            </h3>
                            <span>
                                <img src={arrowUp} alt="Arrow Up" />
                            </span>
                        </div>
                        <div className="minTemperature">
                            <h3>
                                {minTemperature}°C
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
