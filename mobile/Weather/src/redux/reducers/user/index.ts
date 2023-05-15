import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../../types';
import {changePassword, loginUser, registerUser} from '../../modules/user';

export interface UserReducerType {
  user: User | null;
  loginErrorMessage: string | null;
  signupErrorMessage: string | null;
  changePasswordStatus: number | null;
  changePasswordMessage: string | null;
}

const initialState: UserReducerType = {
  user: null,
  loginErrorMessage: null,
  signupErrorMessage: null,
  changePasswordStatus: null,
  changePasswordMessage: null,
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
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changePasswordStatusMessage;
    });
  },
});

export default userSlice.reducer;
export const {logout, resetSignupErrorMessage, resetLoginErrorMessage} =
  userSlice.actions;
