import {RootReducerType} from '../reducers';

export const selectUnitType = (state: RootReducerType) =>
  state.settings.unit.type;

export const selectPressureType = (state: RootReducerType) =>
  state.settings.pressure.type;

export const selectTheme = (state: RootReducerType) =>
  state.settings.theme.isDarkMode;
