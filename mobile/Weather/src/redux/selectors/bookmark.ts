import {RootReducerType} from '../reducers';
import {createSelector} from '@reduxjs/toolkit';
import {selectIsUserLoggedIn} from './user';

export const selectAccountBasedBookmarkedLocations = (state: RootReducerType) =>
  state.bookmark.locationsAccountBased;
export const selectDeviceBasedBookmarkedLocations = (state: RootReducerType) =>
  state.bookmark.locationsDeviceBased;

export const selectBookmarkedLocations = createSelector(
  [
    selectIsUserLoggedIn,
    selectAccountBasedBookmarkedLocations,
    selectDeviceBasedBookmarkedLocations,
  ],
  (isUserLoggedIn, accountBased, deviceBased) => {
    if (isUserLoggedIn) {
      return accountBased;
    } else {
      return deviceBased;
    }
  },
);

export const selectIsLocationBookmarked = createSelector(
  [
    selectBookmarkedLocations,
    (state: RootReducerType, locationId: number) => locationId,
  ],
  (bookmarkedLocations, locationId) => {
    return (
      bookmarkedLocations[locationId] !== undefined &&
      bookmarkedLocations[locationId]
    );
  },
);
