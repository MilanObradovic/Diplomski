import React, {useContext} from 'react';
import {Switch} from 'react-native';
import {AppThemeContext} from '../../context/theme';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ThemedSwitch = ({value, onValueChange}: Props) => {
  const {theme} = useContext(AppThemeContext);
  const {textColor} = theme;
  return (
    <Switch
      value={value}
      onValueChange={newValue => {
        onValueChange(newValue);
      }}
      thumbColor={textColor}
    />
  );
};
