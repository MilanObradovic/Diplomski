import {createAsyncThunk} from '@reduxjs/toolkit';
import {createBookmark, deleteBookmark} from '../api/user';

export const saveBookmark = createAsyncThunk(
  'saveBookmark',
  async ({
    username,
    locationName,
    q,
  }: {
    username: string;
    locationName: string;
    q: string;
  }) => {
    const response = await createBookmark({username, locationName, q});
    return response;
  },
);

export const removeBookmark = createAsyncThunk(
  'removeBookmark',
  async ({
    username,
    locationName,
  }: {
    username: string;
    locationName: string;
  }) => {
    const response = await deleteBookmark({username, locationName});
    return response;
  },
);
