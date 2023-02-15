import {Platform} from 'react-native';
import moment from 'moment';
import {GeoPoint} from '../hooks/useUserLocation';
import {Hourly, WeatherDescription} from '../types';
import LottieView from 'lottie-react-native';
import React from 'react';

export async function post(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const result = await response.json();
  return {data: result, status: response.status}; // parses JSON response into native JavaScript objects
}

export async function get(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return {data: result, status: response.status};
}

export const isiOSPlatform = () => (Platform.OS = 'ios');

export const getHourCopyFromMilitaryCopy = (militaryCopy: string): string => {
  const militaryNum = parseInt(militaryCopy, 10) / 100;
  return `${militaryNum}:00`;
};

export const getInitialScrollHourIndex = () => {
  return parseInt(moment().format('H'), 10);
};

export const getRGBFromHex = (colorHex: string) => {
  const aRgbHex = colorHex.slice(1).match(/.{1,2}/g);
  if (!aRgbHex) {
    return 'rgb(0, 0, 0)';
  }
  return `rgb(${parseInt(aRgbHex[0], 16)}, ${parseInt(
    aRgbHex[1],
    16,
  )}, ${parseInt(aRgbHex[2], 16)})`;
};

export const getRGBFromHexWithOpacity = (colorHex: string, opacity: number) => {
  const aRgbHex = colorHex.slice(1).match(/.{1,2}/g);
  if (!aRgbHex) {
    return 'rgb(0, 0, 0)';
  }
  return `rgba(${parseInt(aRgbHex[0], 16)}, ${parseInt(
    aRgbHex[1],
    16,
  )}, ${parseInt(aRgbHex[2], 16)}, ${opacity})`;
};

export const prepareCoordsForApi = (coords: GeoPoint) => {
  return `${coords.latitude},${coords.longitude}`;
};

export const getWeatherDescriptionForFutureDay = (hourly: Hourly[]): string => {
  return hourly[11].weatherDesc[0].value;
};

// i have to return whole lotties, because require canno be programatically changed
// maybe could be done with uri as a source
export const getWeatherIconFromDescription = (
  description: WeatherDescription,
  isTimeSensitive = false,
) => {
  const time =
    parseInt(moment().format('HH')) > 18 || parseInt(moment().format('HH')) < 3;
  const isNight = time && isTimeSensitive;
  switch (description) {
    case 'Fog':
    case 'Freezing fog':
    case 'Mist':
    case 'Mist, Fog':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-mist.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/foggy.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    case 'Partly cloudy':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-cloudynight.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-partly-cloudy.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    case 'Patchy light drizzle':
    case 'Freezing drizzle':
    case 'Heavy freezing drizzle':
    case 'Heavy rain':
    case 'Heavy rain at times':
    case 'Light drizzle':
    case 'Light freezing rain':
    case 'Light rain':
    case 'Light rain shower':
    case 'Light showers of ice pellets':
    case 'Moderate or Heavy freezing rain':
    case 'Moderate rain':
    case 'Moderate rain at times':
    case 'Patchy freezing drizzle nearby':
    case 'Patchy light rain':
    case 'Patchy light rain in area with thunder':
    case 'Moderate or heavy rain in area with thunder':
    case 'Moderate or heavy rain shower':
    case 'Torrential rain shower':
    case 'Thundery outbreaks in nearby':
    case 'Patchy rain nearby':
    case 'Patchy rain possible':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-rainynight.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-partly-shower.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    case 'Blowing snow':
    case 'Blizzard':
    case 'Moderate or heavy sleet':
    case 'Moderate or heavy sleet showers':
    case 'Moderate or heavy snow in area with thunder':
    case 'Moderate or heavy snow showers':
    case 'Heavy snow':
    case 'Ice pellets':
    case 'Light sleet':
    case 'Light sleet showers':
    case 'Light snow':
    case 'Light snow showers':
    case 'Moderate snow':
    case 'Patchy heavy snow':
    case 'Patchy light snow':
    case 'Patchy sleet nearby':
    case 'Patchy snow nearby':
    case 'Patchy light snow in area with thunder':
    case 'Patchy moderate snow':
    case 'Moderate or heavy showers of ice pellets':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-snownight.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-snow.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    case 'Clear':
    case 'Sunny':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-night.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-sunny.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    case 'Cloudy':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-cloudynight.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-windy.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    case 'Overcast':
      return (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-windy.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
    default:
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-cloudynight.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-windy.json')}
          style={{
            position: 'absolute',
            paddingTop: 40,
            alignSelf: 'flex-end',
          }}
        />
      );
  }
};

export const getWeatherIconFromDescriptionDayCard = (
  description: WeatherDescription,
  isTimeSensitive = false,
) => {
  const time =
    parseInt(moment().format('HH')) > 20 || parseInt(moment().format('HH')) < 3;
  const isNight = time && isTimeSensitive;
  switch (description) {
    case 'Fog':
    case 'Freezing fog':
    case 'Mist':
    case 'Mist, Fog':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-mist.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/foggy.json')}
          style={{flex: 1, width: 70}}
        />
      );
    case 'Partly cloudy':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-cloudynight.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-partly-cloudy.json')}
          style={{flex: 1, width: 70}}
        />
      );
    case 'Patchy light drizzle':
    case 'Freezing drizzle':
    case 'Heavy freezing drizzle':
    case 'Heavy rain':
    case 'Heavy rain at times':
    case 'Light drizzle':
    case 'Light freezing rain':
    case 'Light rain':
    case 'Light rain shower':
    case 'Light showers of ice pellets':
    case 'Moderate or Heavy freezing rain':
    case 'Moderate rain':
    case 'Moderate rain at times':
    case 'Patchy freezing drizzle nearby':
    case 'Patchy light rain':
    case 'Patchy light rain in area with thunder':
    case 'Moderate or heavy rain in area with thunder':
    case 'Moderate or heavy rain shower':
    case 'Torrential rain shower':
    case 'Thundery outbreaks in nearby':
    case 'Patchy rain nearby':
    case 'Patchy rain possible':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-rainynight.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-partly-shower.json')}
          style={{flex: 1, width: 70}}
        />
      );
    case 'Blowing snow':
    case 'Blizzard':
    case 'Moderate or heavy sleet':
    case 'Moderate or heavy sleet showers':
    case 'Moderate or heavy snow in area with thunder':
    case 'Moderate or heavy snow showers':
    case 'Heavy snow':
    case 'Ice pellets':
    case 'Light sleet':
    case 'Light sleet showers':
    case 'Light snow':
    case 'Light snow showers':
    case 'Moderate snow':
    case 'Patchy heavy snow':
    case 'Patchy light snow':
    case 'Patchy sleet nearby':
    case 'Patchy snow nearby':
    case 'Patchy light snow in area with thunder':
    case 'Patchy moderate snow':
    case 'Moderate or heavy showers of ice pellets':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-snownight.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-snow.json')}
          style={{flex: 1, width: 70}}
        />
      );
    case 'Clear':
    case 'Sunny':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-night.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-sunny.json')}
          style={{flex: 1, width: 70}}
        />
      );
    case 'Cloudy':
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-cloudynight.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-windy.json')}
          style={{flex: 1, width: 70}}
        />
      );
    case 'Overcast':
      return (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-windy.json')}
          style={{flex: 1, width: 70}}
        />
      );
    default:
      return isNight ? (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-cloudynight.json')}
          style={{flex: 1, width: 70}}
        />
      ) : (
        <LottieView
          autoPlay={true}
          source={require('../lotties/weather-windy.json')}
          style={{flex: 1, width: 70}}
        />
      );
  }
};

export const resolveUVIndex = (value: number) => {
  if (value < 3) {
    return 'Low';
  } else if (value < 6) {
    return 'Moderate';
  } else if (value < 9) {
    return 'High';
  } else {
    return 'Very high';
  }
};
