import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {AppThemeContext} from '../../context/theme';

export const ThemedStatusBar = () => {
  const {isDarkMode} = useContext(AppThemeContext);
  return <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />;
};
