import axios from 'axios';

const WORLD_WEATHER_ONLINE_TOKEN = 'c7409f77d1c64791b63172059212208';
const BASE_WEATHER_URL =
  'https://api.worldweatheronline.com/premium/v1/weather.ashx';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Token = WORLD_WEATHER_ONLINE_TOKEN;
axios.defaults.baseURL = BASE_WEATHER_URL;
axios.defaults.responseType = 'json';
