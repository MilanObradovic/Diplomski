import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  createBookmark,
  deleteBookmark,
  getBookmarksForUser,
} from '../api/bookmark';
import {Alert} from 'react-native';

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
    if (response.status === 401) {
      Alert.alert(response.data);
    }
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
