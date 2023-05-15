import {get, post, localhost} from '../../utils';

export const createUser = (data: {username: string; password: string}) => {
  return post(`http://${localhost}:3000/user`, {
    action: 'registration',
    data,
  });
};

export const login = (data: {username: string; password: string}) => {
  return post(`http://${localhost}:3000/user`, {
    action: 'login',
    data,
  });
};

export const patchPassword = ({
  username,
  oldPassword,
  newPassword,
}: {
  username: string;
  oldPassword: string;
  newPassword: string;
}) => {
  return post(`http://${localhost}:3000/user`, {
    action: 'changePassword',
    data: {username, oldPassword, newPassword},
  });
};

export const getAllUsers = () => {
  return get(`http://${localhost}:3000/user/all`);
};

export const deactivateUser = ({
  username,
  isActive,
}: {
  username: string;
  isActive: boolean;
}) => {
  return post(`http://${localhost}:3000/user`, {
    action: 'deactivate',
    data: {username, isActive},
  });
};

export const sendFCMToken = (data: {username: string; token: string}) => {
  return post(`http://${localhost}:3000/user`, {
    action: 'FCMToken',
    data: {username: data.username, token: data.token},
  });
};
