import {User} from '../../types';
import {
  createUser,
  deactivateUser,
  getAllUsers,
  login,
  patchPassword,
} from '../api/user';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {logout} from '../reducers/user';
import {deleteFCMToken} from '../../utils';

export const registerUser = createAsyncThunk<
  {data: User | string; status: number},
  {username: string; password: string}
>('user/register', async ({username, password}) => {
  // @ts-ignore
  const {data, status} = await createUser({username, password});
  return {data, status};
});

export const loginUser = createAsyncThunk<
  {data: User | string; status: number},
  {username: string; password: string}
>('user/login', async ({username, password}) => {
  // @ts-ignore
  const {data, status} = await login({username, password});
  return {data, status};
});

export const logoutUser = createAsyncThunk<{}, undefined>(
  'user/login',
  async (a, {dispatch}) => {
    // @ts-ignore
    dispatch(logout());
    deleteFCMToken();
  },
);

export const changePassword = createAsyncThunk<
  Promise<{data: string | null; status: number}>,
  {username: string; oldPassword: string; newPassword: string}
>('user/changePassword', async ({username, oldPassword, newPassword}) => {
  return patchPassword({username, oldPassword, newPassword});
});

export const fetchAllUsers = createAsyncThunk<
  {data: User[]; status: number},
  undefined
>('user/fetchAll', async () => {
  const {data, status} = await getAllUsers();
  return {data, status};
});

export const disableUser = createAsyncThunk<
  {data: string; status: number},
  {username: string; isActive: boolean}
>('user/disableUser', async ({username, isActive}) => {
  return deactivateUser({username, isActive});
});
