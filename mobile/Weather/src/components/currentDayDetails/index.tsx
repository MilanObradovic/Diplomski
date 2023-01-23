import React, {useContext} from 'react';
import moment from 'moment';
import {Text, View} from 'react-native';
import {mBar} from '../../redux/reducers/pressure';
import {UNIT_METRIC} from '../../redux/reducers/unit';
import {resolveUVIndex} from '../../utils';
import {useSelector} from 'react-redux';
import {
  selectCurrentWeatherConditions,
  selectFutureHourlyData,
} from '../../redux/selectors/weather';
import {AppThemeContext} from '../../context/theme';
import {
  selectPressureType,
  selectUnitType,
} from '../../redux/selectors/settings';

const CurrentDayDetails = () => {
  const futureHourlyData = useSelector(selectFutureHourlyData);
  const unitType = useSelector(selectUnitType);
  const pressureType = useSelector(selectPressureType);
  const currentWeatherConditions = useSelector(selectCurrentWeatherConditions);
  const {theme} = useContext(AppThemeContext);
  const currentHour = moment().format('H');
  const {
    humidity,
    pressure,
    pressureInches,
    uvIndex,
    windspeedKmph,
    windspeedMiles,
    visibility,
    visibilityMiles,
    winddir16Point,
  } = currentWeatherConditions!;

  const renderCurrentDayItem = (title: string, value: string) => {
    return (
      <Text style={{color: theme.textColor, marginBottom: 8, lineHeight: 24}}>
        <Text>
          {title}
          {'\n'}
        </Text>
        <Text style={{fontWeight: 'bold'}}>{value}</Text>
      </Text>
    );
  };

  return (
    <View style={{paddingHorizontal: 16, marginTop: 32}}>
      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.fontSize.lg,
          marginBottom: 16,
        }}>
        Current conditions
      </Text>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          {renderCurrentDayItem('Humidity', `${humidity}%`)}
          {renderCurrentDayItem(
            'Pressure',
            pressureType === mBar
              ? `${pressure} mBar`
              : `${pressureInches} inHg`,
          )}
          {renderCurrentDayItem(
            'Precipitation',
            `${futureHourlyData[0][currentHour].chanceofrain}%`,
          )}
        </View>
        <View style={{flex: 1}}>
          {renderCurrentDayItem(
            'Wind',
            unitType === UNIT_METRIC
              ? `${winddir16Point} ${windspeedKmph} km/h`
              : `${winddir16Point} ${windspeedMiles} mi/h`,
          )}
          {renderCurrentDayItem('UV index', resolveUVIndex(uvIndex))}
          {renderCurrentDayItem(
            'Visibility',
            unitType === UNIT_METRIC
              ? `${visibility} km`
              : `${visibilityMiles} mi`,
          )}
        </View>
      </View>
    </View>
  );
};

export default CurrentDayDetails;
