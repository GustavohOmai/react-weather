import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface TemperatureState {
  temperature: number | null;
  maxTemperature: number | null;
  minTemperature: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TemperatureState = {
  temperature: null,
  maxTemperature: null,
  minTemperature: null,
  status: 'idle',
  error: null,
};

const apiKey: string = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchTemperature = createAsyncThunk('temperature/fetchTemperature', async () => {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Paris&days=1&aqi=no&alerts=no`);
  const data = await response.json();
  return {
    temperature: data.current.temp_c,
    maxTemperature: data.forecast.forecastday[0].day.maxtemp_c,
    minTemperature: data.forecast.forecastday[0].day.mintemp_c
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
      })
      .addCase(fetchTemperature.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch temperature';
      });
  },
});

export default temperatureSlice.reducer;
