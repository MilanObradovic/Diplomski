import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import {AppThemeContext} from '../context/theme';
import {ThemedSwitch} from '../components/switch';
import Section from '../components/section';
import Button from '../components/button';
import {UNIT_IMPERIAL, UNIT_METRIC} from '../redux/reducers/unit';
import {inHg, mBar} from '../redux/reducers/pressure';
import {useSelector} from 'react-redux';
import {selectPressureType, selectUnitType} from '../redux/selectors/settings';
import {setPressureType} from '../redux/reducers/pressure';
import {setUnitType} from '../redux/reducers/unit';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

function SettingsScreen({navigation}) {
  const {isDarkMode, setDarkMode, theme} = useContext(AppThemeContext);
  const unitType = useSelector(selectUnitType);
  const pressureType = useSelector(selectPressureType);

  const dispatch = useAppDispatch();

  const {textColor, fontSize, backgroundColor} = theme;
  return (
    <ScreenWrapper navigation={navigation}>
      <View style={{flex: 1, backgroundColor, padding: 16}}>
        <View style={{paddingBottom: 8}}>
          <Text style={{color: textColor, fontSize: fontSize.md}}>Unites</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingTop: 16,
              justifyContent: 'space-between',
            }}>
            <Button
              isOutlined={unitType !== UNIT_METRIC}
              text={'Metric'}
              onPress={() => {
                dispatch(setUnitType(UNIT_METRIC));
              }}
            />
            <Button
              isOutlined={unitType !== UNIT_IMPERIAL}
              text={'Imperial'}
              onPress={() => {
                dispatch(setUnitType(UNIT_IMPERIAL));
              }}
            />
          </View>
        </View>

        <Section />
        <View style={{paddingVertical: 16}}>
          <Text style={{color: textColor, fontSize: fontSize.md}}>
            Pressure units
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingTop: 8,
              justifyContent: 'space-between',
            }}>
            <Button
              isOutlined={pressureType !== mBar}
              text={'mBar'}
              onPress={() => {
                dispatch(setPressureType(mBar));
              }}
            />
            <Button
              isOutlined={pressureType !== inHg}
              text={'inHg'}
              onPress={() => {
                dispatch(setPressureType(inHg));
              }}
            />
          </View>
        </View>
        <Section />
        <View
          style={{
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: textColor, fontSize: fontSize.md}}>
            Dark mode
          </Text>
          <ThemedSwitch
            value={isDarkMode}
            onValueChange={value => {
              setDarkMode(value);
            }}
          />
        </View>
        <Section />
        <Text
          style={{color: textColor, fontSize: fontSize.md, paddingVertical: 8}}>
          Location access
        </Text>
        <Section />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Change password');
          }}
          style={{
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: theme.textColor,
              fontSize: fontSize.md,
              paddingVertical: 8,
            }}>
            Change password
          </Text>
          <FontAwesomeIcon
            color={theme.primary}
            icon={faChevronRight}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
export default SettingsScreen;
