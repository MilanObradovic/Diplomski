import {createAsyncThunk} from '@reduxjs/toolkit';
import {getWeatherData} from '../api/weather';
import {Alert, CurrentCondition, FutureDaysWeather} from '../../types';
import {GeoPoint} from '../../hooks/useUserLocation';

export const fetchWeatherData = createAsyncThunk<
  {
    futureDays: FutureDaysWeather;
    currentCondition: CurrentCondition;
    alerts: Alert[];
  },
  {location?: string; userCoords?: GeoPoint}
>(
  'weather/fetchWeatherData',
  async ({location = undefined, userCoords = undefined}) => {
    // @ts-ignore
    const response = await getWeatherData({location, userCoords});
    const {weather, current_condition, alerts} = response.data.data;
    return {
      currentCondition: current_condition[0],
      futureDays: weather,
      alerts: alerts?.alert,
    };
  },
);
