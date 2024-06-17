import React from "react";
import Temperature from "./components/temperature";
import './app.css';

function App() {
  return (
    <>
        <div className="container bg-gradient">
            <Temperature />
        </div>
    </>
  );
}

export default App;