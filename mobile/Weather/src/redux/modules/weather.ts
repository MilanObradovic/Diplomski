import {createAsyncThunk} from '@reduxjs/toolkit';
import {getWeatherData} from '../api/weather';
import {CurrentCondition, FutureDaysWeather} from '../../types';

export const fetchWeatherData = createAsyncThunk<
  {futureDays: FutureDaysWeather; currentCondition: CurrentCondition},
  {location: string}
>('weather/fetchWeatherData', async ({location}) => {
  // @ts-ignore
  const response = await getWeatherData({location});
  const {weather, current_condition} = response.data.data;
  return {currentCondition: current_condition[0], futureDays: weather};
});
