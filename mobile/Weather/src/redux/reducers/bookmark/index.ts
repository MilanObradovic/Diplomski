import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Location} from '../../../types';
import {
  fetchBookmarksForUser,
  removeBookmark,
  saveBookmark,
} from '../../modules/bookmark';
import {logout} from '../user';

export interface BookmarkReducerType {
  locationsAccountBased: {[key: number]: Location};
  locationsDeviceBased: {[key: number]: Location};
}

const initialState: BookmarkReducerType = {
  locationsAccountBased: {},
  locationsDeviceBased: {},
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmarkLocally(
      state: BookmarkReducerType,
      action: PayloadAction<Location>,
    ) {
      state.locationsDeviceBased[action.payload.id] = action.payload;
    },
    removeBookmarkLocally(
      state: BookmarkReducerType,
      action: PayloadAction<number>,
    ) {
      if (state.locationsDeviceBased[action.payload]) {
        delete state.locationsDeviceBased[action.payload];
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBookmarksForUser.pending, (state, action) => {
      state.locationsAccountBased = {};
    });
    builder.addCase(fetchBookmarksForUser.fulfilled, (state, action) => {
      const {status, data} = action.payload;
      if (status === 200) {
        data.forEach(bookmark => {
          state.locationsAccountBased[bookmark.locationName] = bookmark;
        });
      }
    });
    builder.addCase(saveBookmark.fulfilled, (state, action) => {
      const {status, data} = action.payload;
      if (status === 200) {
        state.locationsAccountBased[data.locationName] = data;
      }
    });
    builder.addCase(removeBookmark.fulfilled, (state, action) => {
      const {status, data} = action.payload;
      if (status === 200) {
        delete state.locationsAccountBased[data.locationName];
      }
    });
    builder.addCase(logout, state => {
      state.locationsAccountBased = {};
    });
  },
});

export default bookmarkSlice.reducer;

export const {addBookmarkLocally, removeBookmarkLocally} =
  bookmarkSlice.actions;
