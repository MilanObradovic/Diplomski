import {combineReducers} from '@reduxjs/toolkit';
import themeReducer, {ThemeReducerType} from '../theme';
import unitReducer, {UnitReducerType} from '../unit';
import pressureReducer, {PressureReducerType} from '../pressure';

export type SettingsReducerType = {
  pressure: PressureReducerType;
  theme: ThemeReducerType;
  unit: UnitReducerType;
};

const settingsReducer = combineReducers<SettingsReducerType>({
  pressure: pressureReducer,
  theme: themeReducer,
  unit: unitReducer,
});
export default settingsReducer;
