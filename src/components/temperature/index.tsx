import React from "react"
import './index.css'
import Date from "../date";

function Temperature() {

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
                                ICON
                            </span>
                        </div>
                        <div className="minTemperature">
                            <h3>
                                18°C
                            </h3>
                            <span>
                                ICON
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
