/* jshint esversion: 6 */
import assert from "assert";
import { dateToEpoch } from "../utils/utils";
import * as config from "../config/config";

const API = {};

API.getWeatherByDate = async (coordinate, date, myConfig) => {
  /* global fetch */

  assert(coordinate !== null, "coordinate must not be null");
  assert(coordinate.lat !== null, "coordinate.lat must not be null");
  assert(coordinate.long !== null, "coordinate.long must not be null");

  assert(date !== null, "Date second input parameter is required.");
  let currentWeather = {};
  try {
    const dateTime = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;

    const epochTime = dateToEpoch(dateTime);

    const URL = `${myConfig.darkSkyUrl}/${config.apiKey}/${coordinate.lat},${coordinate.long
      },${epochTime}?${myConfig.exclude}`;

    const options = {};
    const response = await fetch(myConfig.proxyUrl + "/" + URL, options);
    currentWeather = await response.json();
  } catch (err) {
    throw new Error(err);
  }
  return currentWeather;
};

export default API;