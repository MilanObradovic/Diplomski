import {BASE_SEARCH_URL} from '../../constants';
import axios, {AxiosPromise} from 'axios';

export const getSearchData = (location: string): AxiosPromise<any> => {
  const requestUrl = BASE_SEARCH_URL + `&query=${location}`;
  return axios(requestUrl);
};
