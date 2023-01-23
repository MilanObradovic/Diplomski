import React, {useContext} from 'react';
import {Easing, Text, TouchableOpacity, View} from 'react-native';
import {AppThemeContext} from '../../context/theme';
import {SingleDayWeather} from '../../types';
import moment from 'moment';
import {
  getWeatherDescriptionForFutureDay,
  getWeatherIconFromDescriptionDayCard,
} from '../../utils';
import {moment_calendar_settings} from '../../constants';
import TextTicker from 'react-native-text-ticker';
import {useSelector} from 'react-redux';
import {selectUnitType} from '../../redux/selectors/settings';
import {UNIT_METRIC} from '../../redux/reducers/unit';

type Props = {
  day: SingleDayWeather;
  isSelected?: boolean;
  index: number;
  onPress: (index: number) => {};
};

const DayCard = ({day, isSelected = false, onPress, index}: Props) => {
  const {theme} = useContext(AppThemeContext);
  const unitType = useSelector(selectUnitType);
  const {maxtempF, maxtempC, mintempF, mintempC, date, hourly} = day;
  const weatherLottie = getWeatherIconFromDescriptionDayCard(
    hourly[11].weatherDesc[0].value,
    index === 0,
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress(index);
      }}>
      <View
        style={{
          backgroundColor: isSelected ? theme.gray : theme.backgroundColor,
          borderWidth: 1,
          borderColor: theme.primary,
          borderRadius: 5,
          width: 90,
          height: 140,
          marginRight: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Text
          style={{
            color: theme.textColor,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {moment(date, 'YYYY-MM-DD').calendar(null, moment_calendar_settings)}
        </Text>
        <TextTicker
          style={{
            color: theme.textColor,
            fontSize: 14,
            textAlign: 'center',
          }}
          duration={3000}
          repeatSpacer={30}
          easing={Easing.linear}
          loop>
          {getWeatherDescriptionForFutureDay(hourly)}
        </TextTicker>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {weatherLottie}
        </View>
        <Text
          style={{
            color: theme.textColor,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          &uarr; {unitType === UNIT_METRIC ? maxtempC : maxtempF}&deg;
          {unitType === UNIT_METRIC ? 'C' : 'F'}
        </Text>
        <Text
          style={{
            color: theme.textColor,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          &darr; {unitType === UNIT_METRIC ? mintempC : mintempF}&deg;
          {unitType === UNIT_METRIC ? 'C' : 'F'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DayCard;
