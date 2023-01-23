import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Section from '../section';
import {AppThemeContext} from '../../context/theme';

interface Props {
  content: string;
  onPress: () => void;
}

export const SearchItem = ({content, onPress}: Props) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: theme.backgroundColor,
          height: 40,
          justifyContent: 'center',
          paddingLeft: 8,
        }}>
        <Text style={{fontSize: 16, color: theme.textColor}}>{content}</Text>
      </View>
      <Section />
    </TouchableOpacity>
  );
};

export default SearchItem;
