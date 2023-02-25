import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectCurrentWeatherConditions} from '../../redux/selectors/weather';
import {AppThemeContext} from '../../context/theme';
import {selectCurrentLocation} from '../../redux/selectors/currentLocation';
import {getRGBFromHexWithOpacity} from '../../utils';

const AirQuality = () => {
  const currentWeatherConditions = useSelector(selectCurrentWeatherConditions);
  const {theme} = useContext(AppThemeContext);
  const {air_quality} = currentWeatherConditions!;
  const {currentLocation, type} = useSelector(selectCurrentLocation);

  // US - EPA standard.
  // 1 means Good
  // 2 means Moderate
  // 3 means Unhealthy for sensitive group
  // 4 means Unhealthy
  // 5 means Very Unhealthy
  // 6 means Hazardous
  const determineAQICopy = (index: string) => {
    switch (parseInt(index, 10)) {
      case 1:
        return 'Good';
      case 2:
        return 'Moderate';
      case 3:
        return 'Unhealthy for sensitive group';
      case 4:
        return 'Unhealthy';
      case 5:
        return 'Very Unhealthy';
      case 6:
        return 'Hazardous';
    }
  };

  const determineAQIColor = (index: string) => {
    switch (parseInt(index, 10)) {
      case 1:
        return '#1fdb28';
      case 2:
        return '#f5e042';
      case 3:
        return '#f5a442';
      case 4:
        return theme.danger;
      case 5:
        return '#941818';
      case 6:
        return '#610505';
    }
  };

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
    <View style={{marginHorizontal: 16, marginTop: 32}}>
      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.fontSize.lg,
          marginBottom: 16,
        }}>
        Air Quality
      </Text>
      <Text
        style={{
          color: theme.textColor,
          fontSize: theme.fontSize.md,
          marginBottom: 16,
        }}>
        PM2.5 concentration in {currentLocation.locationName} is currently{' '}
        {Math.round(air_quality.pm2_5) / 5} times the WHO annual air quality
        guideline value
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: getRGBFromHexWithOpacity(
            determineAQIColor(air_quality['us-epa-index']),
            0.5,
          ),
          borderRadius: 5,
          padding: 8,
        }}>
        <View style={{flex: 1}}>
          {renderCurrentDayItem(
            'Air quality index',
            determineAQICopy(air_quality['us-epa-index']),
          )}
          {renderCurrentDayItem(
            'PM 2.5 (μg/m3)',
            Math.round(air_quality.pm2_5),
          )}
          {renderCurrentDayItem('PM 10 (μg/m3)', Math.round(air_quality.pm10))}
        </View>
        <View style={{flex: 1}}>
          {renderCurrentDayItem(
            'Sulphur dioxide (μg/m3)',
            Math.round(air_quality.so2),
          )}
          {renderCurrentDayItem(
            'Nitrogen dioxide (μg/m3)',
            Math.round(air_quality.no2),
          )}
          {renderCurrentDayItem(
            'Carbon Monoxide (μg/m3)',
            Math.round(air_quality.co),
          )}
        </View>
      </View>
    </View>
  );
};

export default AirQuality;
