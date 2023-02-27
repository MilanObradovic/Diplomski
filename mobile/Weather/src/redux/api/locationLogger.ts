import {get, post} from '../../utils';

export const logLocation = ({locationName}: {locationName: string}) => {
  return post('http://10.0.2.2:3000/locationLog', {data: {locationName}});
};

export const getLocationLogs = () => {
  return get('http://10.0.2.2:3000/locationLog');
};
