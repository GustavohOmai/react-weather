import React from "react";
import Temperature from "./components/temperature";
import WeatherImage from "./components/weatherImage";
import './app.css';
import CardList from "./components/card";

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
              <CardList />
            </div>
          </div>
        </div>
    </>
  );
}

export default App;