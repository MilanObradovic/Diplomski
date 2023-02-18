import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadingStatuses, Location, User} from '../../../types';
import {fetchAllUsers} from '../../modules/user';

export interface AdminReducerType {
  users: User[];
  userLoadingStatus: LoadingStatuses;
  locations: Location[];
  locationLoadingStatus: LoadingStatuses;
}

const initialState: AdminReducerType = {
  users: [],
  userLoadingStatus: LoadingStatuses.NotInitialized,
  locations: [],
  locationLoadingStatus: LoadingStatuses.NotInitialized,
};

const adminSlice = createSlice({
  initialState: initialState,
  name: 'unit',
  reducers: {
    setIsActive: (
      state,
      action: PayloadAction<{username: string; isActive: boolean}>,
    ) => {
      const {username, isActive} = action.payload;
      state.users.forEach(user => {
        if (user.username === username) {
          user.isDisabled = !isActive;
        }
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllUsers.pending, state => {
      state.userLoadingStatus = LoadingStatuses.Initializing;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.userLoadingStatus = LoadingStatuses.Fetched;
    });
  },
});

export default adminSlice.reducer;
export const {setIsActive} = adminSlice.actions;
