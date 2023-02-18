import {combineReducers} from '@reduxjs/toolkit';
import bookmarkReducer, {BookmarkReducerType} from './bookmark';
import weatherReducer, {WeatherReducerType} from './weather';

import currentLocationReducer, {CurrentLocationType} from './currentLocation';
import settingsReducer, {SettingsReducerType} from './settings';
import userReducer, {UserReducerType} from './user';
import adminReducer, {AdminReducerType} from './admin';

export type RootReducerType = {
  user: UserReducerType;
  bookmark: BookmarkReducerType;
  weather: WeatherReducerType;
  currentLocation: CurrentLocationType;
  settings: SettingsReducerType;
  admin: AdminReducerType;
};

export default combineReducers<RootReducerType>({
  user: userReducer,
  weather: weatherReducer,
  bookmark: bookmarkReducer,
  currentLocation: currentLocationReducer,
  settings: settingsReducer,
  admin: adminReducer,
});
