import {combineReducers} from '@reduxjs/toolkit';
import bookmarkReducer, {BookmarkReducerType} from './bookmark';
import weatherReducer, {WeatherReducerType} from './weather';

import currentLocationReducer, {CurrentLocationType} from './currentLocation';
import settingsReducer, {SettingsReducerType} from './settings';

export type RootReducerType = {
  bookmark: BookmarkReducerType;
  weather: WeatherReducerType;
  currentLocation: CurrentLocationType;
  settings: SettingsReducerType;
};

export default combineReducers<RootReducerType>({
  weather: weatherReducer,
  bookmark: bookmarkReducer,
  currentLocation: currentLocationReducer,
  settings: settingsReducer,
});
