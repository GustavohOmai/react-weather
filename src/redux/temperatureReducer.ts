import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Condition {
  text: string;
  icon: string;
}

interface Day {
  avgtemp_c: number;
  maxtemp_c: number;
  mintemp_c: number;
  condition: Condition;
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
}

interface TemperatureState {
  temperature: number | null;
  maxTemperature: number | null;
  minTemperature: number | null;
  weatherImage: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  forecast: ForecastDay[];
}

const initialState: TemperatureState = {
  temperature: null,
  maxTemperature: null,
  minTemperature: null,
  weatherImage: '',
  status: 'idle',
  error: null,
  forecast: [],
};

const getGeolocation = (): Promise<{ latitude: number, longitude: number }> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocalização não é suportada por este navegador."));
    }
  });
};

const apiKey: string = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchTemperature = createAsyncThunk('temperature/fetchTemperature', async () => {
  const { latitude, longitude } = await getGeolocation();

  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`);
  const data = await response.json();

  return {
    temperature: data.current.temp_c,
    maxTemperature: data.forecast.forecastday[0].day.maxtemp_c,
    minTemperature: data.forecast.forecastday[0].day.mintemp_c,
    weatherImage: data.current.condition.icon,
    forecast: data.forecast.forecastday
  };
});

export const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemperature.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTemperature.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.temperature = action.payload.temperature;
        state.maxTemperature = action.payload.maxTemperature;
        state.minTemperature = action.payload.minTemperature;
        state.weatherImage = action.payload.weatherImage;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchTemperature.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch temperature';
      });
  },
});

export default temperatureSlice.reducer;
