import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchTemperature } from '../../redux/temperatureReducer';
import './index.css';
import { useEffect } from 'react';

function DateComponent() { 

  const dispatch: AppDispatch = useDispatch();
  const forecast = useSelector((state: RootState) => state.temperature.forecast);
  const status = useSelector((state: RootState) => state.temperature.status);
  const error = useSelector((state: RootState) => state.temperature.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTemperature());
    }
  }, [dispatch, status]);

  const formatDate = (dateString: string): string => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(dateString);
    const dayName: string = daysOfWeek[date.getUTCDay()];
    const monthName: string = months[date.getUTCMonth()];
    const day: number = date.getUTCDate();

    return `${dayName} | ${monthName} ${day}`;
  };

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    if (forecast && forecast.length > 0) {
      const today = forecast[0];
      content = <span>{formatDate(today.date)}</span>;
    } else {
      content = <p>No forecast data available</p>;
    }
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="date">
      <h3>{content}</h3>
    </div>
  );
}

export default DateComponent; // Exportando com o novo nome
