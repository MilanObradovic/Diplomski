import {get, localhost, post} from '../../utils';

export const logLocation = ({locationName}: {locationName: string}) => {
  return post(`http://${localhost}:3000/locationLog`, {data: {locationName}});
};

export const getLocationLogs = () => {
  return get(`http://${localhost}:3000/locationLog`);
};
