import {createAsyncThunk} from '@reduxjs/toolkit';
import {getWeatherData} from '../api/weather';
import {Alert, CurrentCondition, FutureDaysWeather} from '../../types';
import {GeoPoint} from '../../hooks/useUserLocation';
import {logLocation} from '../api/locationLogger';

export const fetchWeatherData = createAsyncThunk<
  {
    futureDays: FutureDaysWeather;
    currentCondition: CurrentCondition;
    alerts: Alert[];
    locationId: string | null;
  },
  {location?: string; userCoords?: GeoPoint}
>(
  'weather/fetchWeatherData',
  async ({location = undefined, userCoords = undefined}) => {
    // @ts-ignore
    const response = await getWeatherData({location, userCoords});
    const {weather, current_condition, alerts, nearest_area} =
      response.data.data;
    let areaName = null;
    if (userCoords) {
      areaName = `${nearest_area[0]?.areaName[0]?.value}, ${nearest_area[0]?.country[0]?.value}`;
    }
    logLocation({locationName: location || areaName});
    return {
      currentCondition: current_condition[0],
      futureDays: weather,
      alerts: alerts?.alert,
      locationId: areaName,
    };
  },
);
