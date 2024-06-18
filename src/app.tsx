import React from "react";
import Temperature from "./components/temperature";
import WeatherImage from "./components/weatherImage";
import Card from "./components/card";
import './app.css';

function App() {
  return (
    <>
        <div className="container bg-gradient">
          <div className="mainCard">
            <div className="mainInfos">
              <Temperature />
              <WeatherImage />
            </div>
            <div className="nextDays">
              <Card />
            </div>
          </div>
        </div>
    </>
  );
}

export default App;