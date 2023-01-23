import {RootReducerType} from '../reducers';
import {LoadingStatuses} from '../../types';
import {UNIT_METRIC, UnitType} from '../reducers/unit';

export const selectIsWeatherInitializing = (state: RootReducerType) =>
  state.weather.loadingStatus === LoadingStatuses.Initializing ||
  state.weather.loadingStatus === LoadingStatuses.NotInitialized;

export const selectIsWeatherRefreshing = (state: RootReducerType) =>
  state.weather.loadingStatus === LoadingStatuses.Refreshing;

export const selectCurrentWeatherConditions = (state: RootReducerType) => {
  return state.weather.currentCondition;
};
export const selectCurrentTemperature = (
  state: RootReducerType,
  unitType: UnitType,
) => {
  if (unitType === UNIT_METRIC) {
    return state.weather.currentCondition?.temp_C;
  }
  return state.weather.currentCondition?.temp_F;
};

export const selectFeelsLike = (state: RootReducerType, unitType: UnitType) => {
  if (unitType === UNIT_METRIC) {
    return state.weather.currentCondition?.FeelsLikeC;
  }
  return state.weather.currentCondition?.FeelsLikeF;
};

export const selectWeatherDescription = (state: RootReducerType) =>
  state.weather.futureDays;

export const selectTodaysMaxAndMin = (
  state: RootReducerType,
  unitType: UnitType,
  indexOfDay: number,
) => {
  if (!state.weather.futureDays) {
    return {min: 0, max: 0};
  }
  if (unitType === UNIT_METRIC) {
    return {
      max: parseInt(state.weather.futureDays[indexOfDay].maxtempC, 10),
      min: parseInt(state.weather.futureDays[indexOfDay].mintempC, 10),
    };
  }
  return {
    max: parseInt(state.weather.futureDays[indexOfDay].maxtempF, 10),
    min: parseInt(state.weather.futureDays[indexOfDay].mintempF, 10),
  };
};

export const selectFutureHourlyData = (state: RootReducerType) => {
  return state.weather.futureDays?.map(data => {
    return data.hourly;
  });
};

export const selectFutureDays = (state: RootReducerType) => {
  return state.weather.futureDays;
};
