import {User} from '../../types';
import {createUser, login} from '../api/user';
import {createAsyncThunk} from '@reduxjs/toolkit';

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
