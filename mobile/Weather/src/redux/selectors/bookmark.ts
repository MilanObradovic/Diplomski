import {RootReducerType} from '../reducers';
import {createSelector} from '@reduxjs/toolkit';

export const selectBookmarkedLocations = (state: RootReducerType) =>
  state.bookmark.locations;

export const selectIsLocationBookmarked = createSelector(
  [
    selectBookmarkedLocations,
    (state: RootReducerType, locationId: number) => locationId,
  ],
  (bookmarkedLocations, locationId) =>
    bookmarkedLocations[locationId] !== undefined &&
    bookmarkedLocations[locationId],
);
