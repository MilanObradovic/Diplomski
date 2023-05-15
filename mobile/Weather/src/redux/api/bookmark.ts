import {get, post, localhost} from '../../utils';

export const createBookmark = (data: {
  userId: string;
  locationName: string;
  q: string;
}) => {
  return post(`http://${localhost}:3000/bookmark`, {
    action: 'create',
    data,
  });
};

export const deleteBookmark = (data: {
  userId: string;
  locationName: string;
}) => {
  return post(`http://${localhost}:3000/bookmark`, {
    action: 'delete',
    data,
  });
};

export const getBookmarksForUser = (userId: string) => {
  return get(`http://${localhost}:3000/bookmark/${userId}`);
};

export const sendNot = () => {
  return get(`http://${localhost}:3000/notification`);
};
