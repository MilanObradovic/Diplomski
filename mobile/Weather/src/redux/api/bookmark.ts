import {get, post} from '../../utils';

export const createBookmark = (data: {
  userId: string;
  locationName: string;
  q: string;
}) => {
  return post('http://10.0.2.2:3000/bookmark', {
    action: 'create',
    data,
  });
};

export const deleteBookmark = (data: {
  userId: string;
  locationName: string;
}) => {
  return post('http://10.0.2.2:3000/bookmark', {
    action: 'delete',
    data,
  });
};

export const getBookmarksForUser = (userId: string) => {
  return get(`http://10.0.2.2:3000/bookmark/${userId}`);
};
