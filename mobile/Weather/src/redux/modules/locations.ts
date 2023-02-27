import {createAsyncThunk} from '@reduxjs/toolkit';
import {getSearchData} from '../api/search';
import {getLocationLogs} from '../api/locationLogger';
import {LocationLog} from '../../types';

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

export const fetchLocationLogs = createAsyncThunk<LocationLog[], undefined>(
  'location/fetchLocationLogs',
  async () => {
    const response = await getLocationLogs();
    console.log({response});
    return response.data;
  },
);
