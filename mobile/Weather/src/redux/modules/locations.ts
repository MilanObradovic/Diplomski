import {createAsyncThunk} from '@reduxjs/toolkit';
import {getSearchData} from '../api/search';

export const fetchSearchData = createAsyncThunk<
  {locations: string[]},
  {location: string}
>(
  'locations/fetchSearchData',
  async ({location}) => {
    // @ts-ignore
    const response = await getSearchData(location);
    return {locations: response.data.search_api.result};
  },
  {
    condition(arg): boolean | undefined {
      if (arg.location === '' || !arg.location) {
        return false;
      }
      return true;
    },
  },
);
