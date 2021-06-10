/* jshint esversion: 6 */
import API from "../../api-client/API";
import * as config from "../../config/config";

// action types
export const UPDATE_CURRENT_LOCATION = "UPDATE_CURRENT_LOCATION";
export const UPDATE_DATA = "UPDATE_DATA";

// action types
export const FETCH_CURRENT_WEATHER_SENT = "FETCH_CURRENT_WEATHER_SENT";
export const FETCH_CURRENT_WEATHER_SUCCEED = "FETCH_CURRENT_WEATHER_SUCCEED";
export const FETCH_CURRENT_WEATHER_ERROR = "FETCH_CURRENT_WEATHER_ERROR";

export const FETCH_PAST_WEATHER_SENT = "FETCH_PAST_WEATHER_SENT";
export const FETCH_PAST_WEATHER_SUCCEED = "FETCH_PAST_WEATHER_SUCCEED";
export const FETCH_PAST_WEATHER_ERROR = "FETCH_PAST_WEATHER_ERROR";
export const CLEAR_PAST_WEATHER = "CLEAR_PAST_WEATHER";

export const FETCH_FUTURE_WEATHER_SENT = "FETCH_FUTURE_WEATHER_SENT";
export const FETCH_FUTURE_WEATHER_SUCCEED = "FETCH_FUTURE_WEATHER_SUCCEED";
export const FETCH_FUTURE_WEATHER_ERROR = "FETCH_FUTURE_WEATHER_ERROR";
export const CLEAR_FUTURE_WEATHER = "CLEAR_FUTURE_WEATHER";

// action creators
export const updateCurrentLocation = coordinates => ({
  type: UPDATE_CURRENT_LOCATION,
  payload: coordinates
});

// any state not yet categorized
export const updateData = data => ({
  type: UPDATE_DATA,
  payload: data
});

//----------- fetch current weather---------
export const fetchCurrentWeatherSent = currentWeather => ({
  type: FETCH_CURRENT_WEATHER_SENT,
  payload: currentWeather
});

export const fetchCurrentWeatherSucceed = currentWeather => ({
  type: FETCH_CURRENT_WEATHER_SUCCEED,
  payload: currentWeather
});

export const fetchCurrentWeatherError = error => ({
  type: FETCH_CURRENT_WEATHER_ERROR,
  payload: error
});

// async actions creators
export const updateCurrentWeather = (coordinate, date) => async dispatch => {
  dispatch(fetchCurrentWeatherSent({ isFetched: false }));
  try {
    const myConfig = {
      exclude: "exclude=flags,minutely,hourly,alerts",
      proxyUrl: "https://cors-anywhere.herokuapp.com",
      darkSkyUrl: "https://api.darksky.net/forecast"
    };
    const currentWeather = await API.getWeatherByDate(
      coordinate,
      date,
      myConfig
    );
    dispatch(
      fetchCurrentWeatherSucceed({ ...currentWeather, isFetched: true })
    );
  } catch (error) {
    console.error(error);
    dispatch(fetchCurrentWeatherError(error));
  }
};

//----------- fetch past weather---------
export const fetchPastWeatherSent = pastWeather => ({
  type: FETCH_PAST_WEATHER_SENT,
  payload: pastWeather
});

export const fetchPastWeatherSucceed = pastWeather => ({
  type: FETCH_PAST_WEATHER_SUCCEED,
  payload: pastWeather
});

export const fetchPastWeatherError = error => ({
  type: FETCH_PAST_WEATHER_ERROR,
  payload: error
});

export const clearPastWeather = () => ({
  type: CLEAR_PAST_WEATHER,
  payload: []
});

// async actions creators
export const updatePastWeather = (
  coordinate,
  date,
  pageNo
) => async dispatch => {
  dispatch(fetchPastWeatherSent());
  try {
    const myConfig = {
      exclude: "exclude=flags,currently,minutely,hourly, alerts",
      proxyUrl: "https://cors-anywhere.herokuapp.com",
      darkSkyUrl: "https://api.darksky.net/forecast"
    };
    const pastWeather = await API.getWeatherByDate(coordinate, date, myConfig);
    dispatch(
      fetchPastWeatherSucceed({
        ...pastWeather,
        pageNo,
        pageRecordSize: config.recordsPerPage
      })
    );
  } catch (error) {
    console.error(error);
    dispatch(fetchPastWeatherError(error));
  }
};

//----------- fetch future weather---------
export const fetchFutureWeatherSent = futureWeather => ({
  type: FETCH_FUTURE_WEATHER_SENT,
  payload: futureWeather
});

export const fetchFutureWeatherSucceed = futureWeather => ({
  type: FETCH_FUTURE_WEATHER_SUCCEED,
  payload: futureWeather
});

export const fetchFutureWeatherError = error => ({
  type: FETCH_FUTURE_WEATHER_ERROR,
  payload: error
});

export const clearFutureWeather = () => ({
  type: CLEAR_FUTURE_WEATHER,
  payload: []
});

// async actions creators
export const updateFutureWeather = (
  coordinate,
  date,
  pageNo
) => async dispatch => {
  dispatch(fetchFutureWeatherSent());
  try {
    const myConfig = {
      exclude: "exclude=flags,currently,minutely,hourly, alerts",
      proxyUrl: "https://cors-anywhere.herokuapp.com",
      darkSkyUrl: "https://api.darksky.net/forecast"
    };
    const futureWeather = await API.getWeatherByDate(
      coordinate,
      date,
      myConfig
    );
    dispatch(
      fetchFutureWeatherSucceed({
        ...futureWeather,
        pageNo,
        pageRecordSize: config.recordsPerPage
      })
    );
  } catch (error) {
    console.error(error);
    dispatch(fetchFutureWeatherError(error));
  }
};
