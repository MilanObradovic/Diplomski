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
