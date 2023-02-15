import {RootReducerType} from '../reducers';

export const selectAlerts = (state: RootReducerType) => state.weather.alerts;
