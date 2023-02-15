import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Location} from '../../../types';
import {
  fetchBookmarksForUser,
  removeBookmark,
  saveBookmark,
} from '../../modules/bookmark';

export interface BookmarkReducerType {
  locations: {[key: number]: Location};
}

const initialState: BookmarkReducerType = {
  locations: {},
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmarkLocally(
      state: BookmarkReducerType,
      action: PayloadAction<Location>,
    ) {
      state.locations[action.payload.id] = action.payload;
    },
    removeBookmarkLocally(
      state: BookmarkReducerType,
      action: PayloadAction<number>,
    ) {
      if (state.locations[action.payload]) {
        delete state.locations[action.payload];
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBookmarksForUser.fulfilled, (state, action) => {
      const {status, data} = action.payload;
      if (status === 200) {
        data.forEach(bookmark => {
          state.locations[bookmark.locationName] = bookmark;
        });
      }
    });
    builder.addCase(saveBookmark.fulfilled, (state, action) => {
      const {status, data} = action.payload;
      if (status === 200) {
        state.locations[data.locationName] = data;
      }
    });
    builder.addCase(removeBookmark.fulfilled, (state, action) => {
      const {status, data} = action.payload;
      if (status === 200) {
        delete state.locations[data.locationName];
      }
    });
  },
});

export default bookmarkSlice.reducer;

export const {addBookmarkLocally, removeBookmarkLocally} =
  bookmarkSlice.actions;
