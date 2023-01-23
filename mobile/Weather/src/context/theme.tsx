import React from 'react';
import {StatusBar} from 'react-native';
import {createContext} from 'react';
import {
  darkBackground,
  darkDanger,
  darkGray,
  darkPrimary,
  darkTextColor,
  lightBackground,
  lightDanger,
  lightGray,
  lightPrimary,
  lightTextColor,
} from '../constants';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {setIsDarkMode} from '../redux/reducers/theme';
import {selectTheme} from '../redux/selectors/settings';
type ThemeType = {
  textColor: string;
  backgroundColor: string;
  fontSize: {
    lg: number;
    md: number;
    sm: number;
  };
  primary: string;
  danger: string;
  gray: string;
};

export const AppThemeContext = createContext<{
  isDarkMode: boolean;
  setDarkMode(isDarkMode: boolean): void;
  theme: ThemeType;
}>({
  isDarkMode: false,
  setDarkMode: () => {},
  theme: {
    primary: lightPrimary,
    danger: lightDanger,
    textColor: lightTextColor,
    backgroundColor: lightBackground,
    fontSize: {lg: 22, md: 18, sm: 14},
  },
});

const AppThemeProvider = ({children}: {children: any}) => {
  const isDarkMode = useSelector(selectTheme);
  const dispatch = useAppDispatch();

  const setDarkMode = (value: boolean) => {
    dispatch(setIsDarkMode(value));
    StatusBar.setBarStyle(value ? 'light-content' : 'dark-content');
  };
  const backgroundColor = isDarkMode ? darkBackground : lightBackground;
  const textColor = isDarkMode ? darkTextColor : lightTextColor;
  const fontSize = {
    lg: 22,
    md: 18,
    sm: 14,
  };
  const primary = isDarkMode ? darkPrimary : lightPrimary;
  const danger = isDarkMode ? darkDanger : lightDanger;
  const gray = isDarkMode ? darkGray : lightGray;

  const theme: ThemeType = {
    textColor,
    backgroundColor,
    fontSize,
    primary,
    danger,
    gray,
  };
  return (
    <AppThemeContext.Provider
      value={{isDarkMode, setDarkMode: setDarkMode, theme}}>
      {children}
    </AppThemeContext.Provider>
  );
};
export default AppThemeProvider;
