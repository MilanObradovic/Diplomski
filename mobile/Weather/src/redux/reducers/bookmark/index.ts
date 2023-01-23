import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Location} from '../../../types';

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
    addBookmark(state: BookmarkReducerType, action: PayloadAction<Location>) {
      state.locations[action.payload.id] = action.payload;
    },
    removeBookmark(state: BookmarkReducerType, action: PayloadAction<number>) {
      if (state.locations[action.payload]) {
        delete state.locations[action.payload];
      }
    },
  },
});

export default bookmarkSlice.reducer;

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;
