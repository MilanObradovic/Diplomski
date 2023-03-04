import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {AppThemeContext} from '../../context/theme';
import {
  darkDanger,
  darkPrimary,
  lightDanger,
  lightPrimary,
} from '../../constants';
import {styles} from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

interface Props {
  text: string;
  onPress(): void;
  isPrimary?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
  isOutlined?: boolean;
  icon?: IconProp | null;
}

const Button = ({
  text,
  onPress,
  isPrimary = true,
  isDanger = false,
  isOutlined = true,
  icon = null,
}: Props) => {
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const {primary, danger, backgroundColor} = theme;
  let customTextColor = primary;
  if (!isOutlined) {
    if (isDanger) {
      customTextColor = isDarkMode ? lightDanger : darkDanger;
    } else {
      customTextColor = isDarkMode ? lightPrimary : darkPrimary;
    }
  } else {
    if (isDanger) {
      customTextColor = danger;
    } else {
    }
  }
  const calculatedStyles = {
    borderWidth: isOutlined ? 1 : 0,
    borderColor: isDanger ? danger : primary,
    backgroundColor: isOutlined ? backgroundColor : isDanger ? danger : primary,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[calculatedStyles, styles.container]}>
      {!icon && (
        <Text
          style={{
            color: customTextColor,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {text}
        </Text>
      )}
      {icon && <FontAwesomeIcon icon={icon} color={customTextColor} size={30} />}
    </TouchableOpacity>
  );
};
export default Button;
