import {post} from '../../utils';

export const createUser = (data: {username: string; password: string}) => {
  return post('http://10.0.2.2:3000/user', {
    action: 'registration',
    data,
  });
};

export const login = (data: {username: string; password: string}) => {
  return post('http://10.0.2.2:3000/user', {
    action: 'login',
    data,
  });
};

export const createBookmark = (data: {username: string; locationName: string}) => {
  return post('http://10.0.2.2:3000/bookmark', {
    action: 'create',
    data,
  });
};

export const deleteBookmark = (data: {username: string; locationName: string}) => {
  return post('http://10.0.2.2:3000/bookmark', {
    action: 'delete',
    data,
  });
};
