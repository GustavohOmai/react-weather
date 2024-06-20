import React, { useEffect } from "react"

//imports from Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { fetchTemperature } from "../../redux/temperatureReducer";
import imgWeather from '../../assets/nuvemMock.png'
import './style.css';

function WeatherImage() {

  const dispatch: AppDispatch = useDispatch();
  const imagemClima = useSelector((state: RootState) => state.temperature.weatherImage);
  const status = useSelector((state: RootState) => state.temperature.status);
  const error = useSelector((state: RootState) => state.temperature.error);

  useEffect(() => {
    dispatch(fetchTemperature());
  }, [dispatch]);


  if (status === 'loading') {
    return <div className="loading"><img src={imgWeather} alt="" /></div>;
  }

  if (status === 'failed') {
      return <div className="error">Error: {error}</div>;
  }
  
  return (
    <img src={imagemClima} alt="Clima" className='imagemClima'/>
  );

}

export default WeatherImage;