import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../../types';
import {loginUser, registerUser} from '../../modules/user';
import {selectSignuperrorMessage} from '../../selectors/user';

export interface UserReducerType {
  user: User | null;
  loginErrorMessage: string | null;
  signupErrorMessage: string | null;
}

const initialState: UserReducerType = {
  user: null,
  loginErrorMessage: null,
  signupErrorMessage: null,
};

const userSlice = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    logout: () => {
      return initialState;
    },
    resetSignupErrorMessage: state => {
      state.signupErrorMessage = null;
    },
    resetLoginErrorMessage: state => {
      state.loginErrorMessage = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loginErrorMessage = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const {data, status} = action.payload;
      if (status === 200) {
        state.user = data;
      } else {
        state.signupErrorMessage = data;
      }
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginErrorMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const {data, status} = action.payload;
      if (status === 200) {
        state.user = data;
      } else {
        state.loginErrorMessage = data;
      }
    });
  },
});

export default userSlice.reducer;
export const {logout, resetSignupErrorMessage, resetLoginErrorMessage} =
  userSlice.actions;
