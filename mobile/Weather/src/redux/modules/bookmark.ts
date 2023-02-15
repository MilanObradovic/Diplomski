import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  createBookmark,
  deleteBookmark,
  getBookmarksForUser,
} from '../api/bookmark';

export const saveBookmark = createAsyncThunk(
  'saveBookmark',
  async ({
    userId,
    locationName,
    q,
  }: {
    userId: string;
    locationName: string;
    q: string;
  }) => {
    const response = await createBookmark({userId, locationName, q});
    return response;
  },
);

export const removeBookmark = createAsyncThunk(
  'removeBookmark',
  async ({userId, locationName}: {userId: string; locationName: string}) => {
    const response = await deleteBookmark({userId, locationName});
    return response;
  },
);

export const fetchBookmarksForUser = createAsyncThunk(
  'fetchBookmarksForUser',
  async ({userId}: {userId: string}) => {
    const response = await getBookmarksForUser(userId);
    return response;
  },
);
