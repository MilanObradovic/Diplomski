export type WeatherDescription =
  | 'Moderate or heavy snow in area with thunder'
  | 'Patchy light snow in area with thunder'
  | 'Moderate or heavy rain in area with thunder'
  | 'Patchy light rain in area with thunder'
  | 'Moderate or heavy showers of ice pellets'
  | 'Light showers of ice pellets'
  | 'Moderate or heavy snow showers'
  | 'Light snow showers'
  | 'Moderate or heavy sleet showers'
  | 'Light sleet showers'
  | 'Torrential rain shower'
  | 'Moderate or heavy rain shower'
  | 'Light rain shower'
  | 'Ice pellets'
  | 'Heavy snow'
  | 'Patchy heavy snow'
  | 'Moderate snow'
  | 'Patchy moderate snow'
  | 'Light snow'
  | 'Patchy light snow'
  | 'Moderate or heavy sleet'
  | 'Light sleet'
  | 'Moderate or Heavy freezing rain'
  | 'Light freezing rain'
  | 'Heavy rain'
  | 'Heavy rain at times'
  | 'Moderate rain'
  | 'Moderate rain at times'
  | 'Light rain'
  | 'Patchy light rain'
  | 'Heavy freezing drizzle'
  | 'Freezing drizzle'
  | 'Light drizzle'
  | 'Patchy light drizzle'
  | 'Freezing fog'
  | 'Fog'
  | 'Blizzard'
  | 'Blowing snow'
  | 'Thundery outbreaks in nearby'
  | 'Patchy freezing drizzle nearby'
  | 'Patchy sleet nearby'
  | 'Patchy snow nearby'
  | 'Patchy rain nearby'
  | 'Patchy rain possible'
  | 'Mist'
  | 'Overcast'
  | 'Cloudy'
  | 'Partly cloudy'
  | 'Clear'
  | 'Mist, Fog'
  | 'Sunny';

export type Location = {
  locationName: string;
  id: number;
};

export interface CurrentCondition {
  observation_time: string;
  temp_C: number;
  temp_F: number;
  weatherCode: number;
  weatherIconUrl: [
    {
      value: string;
    },
  ];
  weatherDesc: [
    {
      value: WeatherDescription;
    },
  ];
  windspeedMiles: number;
  windspeedKmph: number;
  winddirDegree: number;
  winddir16Point: string;
  precipMM: number;
  precipInches: number;
  humidity: number;
  visibility: number;
  visibilityMiles: number;
  pressure: number;
  pressureInches: number;
  cloudcover: number;
  FeelsLikeC: number;
  FeelsLikeF: number;
  uvIndex: number;
  air_quality: {
    co: number;
    'gb-defra-index': number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
    so2: number;
    'us-epa-index': number;
  };
}

export type Hourly = {
  time: string;
  tempC: string;
  tempF: string;
  windspeedMiles: string;
  windspeedKmph: string;
  winddirDegree: string;
  winddir16Point: string;
  weatherCode: string;
  weatherIconUrl: [
    {
      value: string;
    },
  ];
  weatherDesc: [
    {
      value: WeatherDescription;
    },
  ];
  precipMM: string;
  precipInches: string;
  humidity: string;
  visibility: string;
  visibilityMiles: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  HeatIndexC: string;
  HeatIndexF: string;
  DewPointC: string;
  DewPointF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustMiles: string;
  WindGustKmph: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofwindy: string;
  chanceofovercast: string;
  chanceofsunshine: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceoffog: string;
  chanceofsnow: string;
  chanceofthunder: string;
  uvIndex: string;
};

export type Astronomy = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
};

export type SingleDayWeather = {
  date: string;
  astronomy: Astronomy[];
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  avgtempC: string;
  avgtempF: string;
  totalSnow_cm: string;
  sunHour: string;
  uvIndex: string;
  hourly: Hourly[];
};

export type FutureDaysWeather = SingleDayWeather[];

export enum LoadingStatuses {
  NotInitialized,
  Initializing,
  Fetched,
  Failed,
  FetchingMore,
  Refreshing,
}

export type User = {
  username: string;
  password: string;
  type?: 'admin' | 'user';
  isDisabled?: boolean;
  dateCreated: Date;
};

export type Alert = {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
};
