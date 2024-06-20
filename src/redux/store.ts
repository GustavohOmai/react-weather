import { configureStore } from '@reduxjs/toolkit';
import temperatureReducer from './temperatureReducer'; 

const store = configureStore({
  reducer: {
    temperature: temperatureReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
