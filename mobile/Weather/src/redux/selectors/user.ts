import {RootReducerType} from '../reducers';

export const selectUser = (state: RootReducerType) => state.user.user;

export const selectIsUserLoggedIn = (state: RootReducerType) =>
  !!state.user.user;

export const selectLoginErrorMessage = (state: RootReducerType) =>
  state.user.loginErrorMessage;
export const selectSignupErrorMessage = (state: RootReducerType) =>
  state.user.signupErrorMessage;
