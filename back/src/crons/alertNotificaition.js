import {CronJob} from 'cron';
import fetch from 'node-fetch';
import {Bookmark, User} from '../models/index.js';
import {sendNotification} from '../firebase.js';

const EVERY_TEN_SECONDS = '0/10 * * * * *';
const EVERY_HOUR = '0 0 * * * * *';
// CRON JOB

const API_KEY = '1cc71b582fce4288bc0171542232503';

const BASE_WEATHER_URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}&format=json&num_of_days=14`;

const requestUrl = placeForSearch =>
  `${BASE_WEATHER_URL}&q=${placeForSearch}&tp=1&alerts=yes`;

export default new CronJob(EVERY_TEN_SECONDS, async () => {
  const fcmTokensByLocation = {};
  const alertsByLocation = {};
  const bookmarks = await Bookmark.find({});
  for (let i = 0; i < bookmarks.length; i++) {
    const user = await User.findOne({username: bookmarks[i].userId});
    if (user && user.fcmToken) {
      if (fcmTokensByLocation[bookmarks[i].locationName]) {
        fcmTokensByLocation[bookmarks[i].locationName].push(user.fcmToken);
      } else {
        fcmTokensByLocation[bookmarks[i].locationName] = [user.fcmToken];
      }
    }
  }
  for (let i = 0; i < bookmarks.length; i++) {
    try {
      const response = await fetch(requestUrl(bookmarks[i].locationName));
      const data = await response.json();
      const {alerts} = data.data;
      if (alerts) {
        alertsByLocation[bookmarks[i].locationName] = alerts;
      }
    } catch (e) {
      console.log({e});
    }
  }
  Object.keys(alertsByLocation).forEach(location => {
    if (
      alertsByLocation[location].alert.length > 0 &&
      fcmTokensByLocation[location] &&
      fcmTokensByLocation[location].length > 0
    ) {
      sendNotification({
        fcmTokens: fcmTokensByLocation[location],
        data: alertsByLocation[location],
        location,
      });
    }
  });
});
