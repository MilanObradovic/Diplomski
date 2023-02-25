import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadingStatuses, Location} from '../../../types';
import {GeoPoint} from '../../../hooks/useUserLocation';
import {fetchSearchData} from '../../modules/locations';

export interface CurrentLocationType {
  currentLocation: Location | GeoPoint | null;
  searchResults: string[];
  loadingStatus: LoadingStatuses;
  type: 'location' | 'coordinates';
}

const initialState: CurrentLocationType = {
  currentLocation: null,
  searchResults: [],
  loadingStatus: LoadingStatuses.NotInitialized,
};

const currentLocationSlice = createSlice({
  initialState: initialState,
  name: 'currentLocation',
  reducers: {
    setCurrentLocation(
      state: CurrentLocationType,
      action: PayloadAction<{
        currentLocation: Location | GeoPoint | null;
        type: 'location' | 'coordinates';
      }>,
    ) {
      state.currentLocation = action.payload.currentLocation;
      state.type = action.payload.type;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchData.fulfilled, (state, action) => {
      state.searchResults = action.payload.locations;
      state.loadingStatus = LoadingStatuses.Fetched;
    });
    builder.addCase(fetchSearchData.pending, state => {
      state.loadingStatus = LoadingStatuses.Initializing;
    });
    builder.addCase(fetchSearchData.rejected, state => {
      state.loadingStatus = LoadingStatuses.Failed;
    });
  },
});

export default currentLocationSlice.reducer;
export const {setCurrentLocation} = currentLocationSlice.actions;
