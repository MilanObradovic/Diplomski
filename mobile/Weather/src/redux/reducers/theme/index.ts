import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeReducerType {
  isDarkMode: boolean;
}

const initialState: ThemeReducerType = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  initialState: initialState,
  name: 'theme',
  reducers: {
    setIsDarkMode(state: ThemeReducerType, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const {setIsDarkMode} = themeSlice.actions;
