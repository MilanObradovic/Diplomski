import {RootReducerType} from '../reducers';
import {LoadingStatuses} from '../../types';

export const selectIsLoadingAllUsers = (state: RootReducerType) =>
  state.admin.userLoadingStatus !== LoadingStatuses.Fetched;

export const selectAllUsers = (state: RootReducerType) => state.admin.users;
