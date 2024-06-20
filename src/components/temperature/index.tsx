import React, { useEffect } from "react"
import './index.css'
import arrowUp from "../../assets/arrowUp.svg"
import arrowDown from "../../assets/arrowDown.svg"
import DateComponent from "../date";
//imports from Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { fetchTemperature } from "../../redux/temperatureReducer";



const Temperature: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const temperature = useSelector((state: RootState) => state.temperature.temperature);
    const maxTemperature = useSelector((state: RootState) => state.temperature.maxTemperature);
    const minTemperature = useSelector((state: RootState) => state.temperature.minTemperature);
    const status = useSelector((state: RootState) => state.temperature.status);
    const error = useSelector((state: RootState) => state.temperature.error);

    useEffect(() => {
        dispatch(fetchTemperature());
    }, [dispatch]);

    if (status === 'loading') {
        return <div className="loading">99.9°C</div>;
    }

    if (status === 'failed') {
        return <div className="error">Error: {error}</div>;
    }

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
                <DateComponent />
            </div>
        </>
    );
};


export default Temperature;
