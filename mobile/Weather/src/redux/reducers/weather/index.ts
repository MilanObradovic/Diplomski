import {createReducer} from '@reduxjs/toolkit';
import {
  CurrentCondition,
  LoadingStatuses,
  FutureDaysWeather,
} from '../../../types';
import {fetchWeatherData} from '../../modules/weather';

export interface WeatherReducerType {
  currentCondition: CurrentCondition | null;
  futureDays: FutureDaysWeather | null;
  loadingStatus: LoadingStatuses;
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
    state.loadingStatus = LoadingStatuses.Fetched;
    state.currentCondition = action.payload.currentCondition;
    state.futureDays = action.payload.futureDays;
  });
  builder.addCase(fetchWeatherData.rejected, (state, action) => {
    state.loadingStatus = LoadingStatuses.Failed;
  });
});
