export const mintGreen = '#0A3A2A';
export const mintGreenDisabled = '#92ddc8';
export const paleBlue = '#caf0f8';
export const blue = '#0077b6';

export const grey = '#cccccc';
export const greyer = '#333333';
export const black = 'black';
export const white = 'white';
export const tomatoDark = '#cb0001';
export const tomatoLight = '#ff6347';

export const darkBackground = black;
export const lightBackground = white;

// export const darkPrimary = mintGreenDisabled;
export const darkPrimary = paleBlue;
// export const lightPrimary = mintGreen;
export const lightPrimary = blue;

export const darkGray = greyer;
export const lightGray = grey;

export const darkTextColor = white;
export const lightTextColor = black;

export const darkDanger = tomatoLight;
export const lightDanger = tomatoDark;

export const NUM_OF_FUTURE_DAYS = 14;

// for email milansd61+3@gmail.com
const API_KEY = '1cc71b582fce4288bc0171542232503';

export const BASE_WEATHER_URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}&format=json&num_of_days=${NUM_OF_FUTURE_DAYS}`;
export const BASE_SEARCH_URL = `https://api.worldweatheronline.com/premium/v1/search.ashx?key=${API_KEY}&format=json`;

export const moment_calendar_settings = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'ddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'ddd, MMM D',
};
