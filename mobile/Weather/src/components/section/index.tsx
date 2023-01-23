import React, {useContext} from 'react';
import {View, ViewStyle} from 'react-native';
import {AppThemeContext} from '../../context/theme';

type Props = {
  style?: ViewStyle;
};

const Section = ({style = {}}: Props) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <View style={[{borderBottomWidth: 1, borderColor: theme.primary}, style]} />
  );
};

export default Section;
