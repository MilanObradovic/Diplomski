import {createReducer} from '@reduxjs/toolkit';
import {
  CurrentCondition,
  LoadingStatuses,
  FutureDaysWeather,
  Alert,
} from '../../../types';
import {fetchWeatherData} from '../../modules/weather';

export interface WeatherReducerType {
  currentCondition: CurrentCondition | null;
  futureDays: FutureDaysWeather | null;
  loadingStatus: LoadingStatuses;
  alerts: Alert[];
}

const initialState: WeatherReducerType = {
  currentCondition: null,
  futureDays: null,
  loadingStatus: LoadingStatuses.NotInitialized,
};

export default createReducer(initialState, builder => {
  builder.addCase(fetchWeatherData.pending, (state, action) => {
    state.loadingStatus = LoadingStatuses.Initializing;
  });
  builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
    const {currentCondition, futureDays, alerts} = action.payload;
    state.loadingStatus = LoadingStatuses.Fetched;
    state.currentCondition = currentCondition;
    state.futureDays = futureDays;
    state.alerts = alerts;
  });
  builder.addCase(fetchWeatherData.rejected, (state, action) => {
    state.loadingStatus = LoadingStatuses.Failed;
  });
});
