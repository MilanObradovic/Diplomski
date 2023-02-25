import {RootReducerType} from '../reducers';

export const selectCurrentLocation = (state: RootReducerType) => ({
  currentLocation: state.currentLocation.currentLocation,
  type: state.currentLocation.type,
});

export const selectSearchLocations = (state: RootReducerType) =>
  state.currentLocation.searchResults;

export const selectSearchLocationsLoadingStatus = (state: RootReducerType) =>
  state.currentLocation.loadingStatus;
