import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { fetchTemperature } from "../../redux/temperatureReducer";
import Card from './card';
import './index.css';
import { useEffect } from 'react';

function CardList() {

    const dispatch: AppDispatch = useDispatch();
    const forecast = useSelector((state: RootState) => state.temperature.forecast);
    const status = useSelector((state: RootState) => state.temperature.status);
    const error = useSelector((state: RootState) => state.temperature.error);

    useEffect(() => {
        dispatch(fetchTemperature());
      }, [dispatch]);

    let content;

    if (status === 'loading') {
        content = <p>Loading...</p>;
    } else if (status === 'succeeded') {
        content = forecast && forecast.length > 0 ? (
            forecast.map((day) => (
                <Card 
                    key={day.date_epoch}
                    date={day.date}
                    icon={day.day.condition.icon}
                    condition={day.day.condition.text}
                    maxTemp={day.day.maxtemp_c}
                    minTemp={day.day.mintemp_c}
                />
            ))
        ) : (
            <p>No forecast data available</p>
        );
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div className="weather-list">
            {content}
        </div>
    );
}

export default CardList;