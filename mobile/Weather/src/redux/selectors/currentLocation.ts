import {RootReducerType} from '../reducers';

export const selectCurrentLocation = (state: RootReducerType) =>
  state.currentLocation.currentLocation;

export const selectSearchLocations = (state: RootReducerType) =>
  state.currentLocation.searchResults;

export const selectSearchLocationsLoadingStatus = (state: RootReducerType) =>
  state.currentLocation.loadingStatus;

