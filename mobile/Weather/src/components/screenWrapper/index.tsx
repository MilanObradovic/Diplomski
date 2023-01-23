import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {AppThemeContext} from '../../context/theme';

const ScreenWrapper = ({children, navigation}) => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const {backgroundColor, textColor} = theme;
  const backgroundStyle = {
    backgroundColor,
    flex: 1,
  };

  useEffect(() => {
    const changeHeaderStyle = () => {
      navigation.setOptions({
        headerStyle: {backgroundColor},
        headerTitleStyle: {color: textColor},
      });
    };
    changeHeaderStyle();
  }, [backgroundColor, isDarkMode, navigation, textColor]);

  return <SafeAreaView style={backgroundStyle}>{children}</SafeAreaView>;
};

export default ScreenWrapper;
