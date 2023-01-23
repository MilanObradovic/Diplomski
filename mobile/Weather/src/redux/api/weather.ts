import {BASE_WEATHER_URL} from '../../constants';
import axios, {AxiosPromise} from 'axios';
import {GeoPoint} from '../../hooks/useUserLocation';
import {prepareCoordsForApi} from '../../utils';

export const getWeatherData = ({
  location,
  userCoords,
}: {
  location?: string;
  userCoords?: GeoPoint;
}): AxiosPromise<any> => {
  const placeForSearch = userCoords
    ? prepareCoordsForApi(userCoords)
    : location;
  const requestUrl =
    BASE_WEATHER_URL + `&q=${placeForSearch}` + '&tp=1' + '&nearest_area=true';
  return axios(requestUrl);
};
