/* jshint esversion: 6 */
import { combineReducers } from "redux";
import * as actionRepo from "../action/actions";

const merge = (prev, next) => Object.assign({}, prev, next);

const currentLocationReducer = (prevLocation = {}, action) => {
  switch (action.type) {
    case actionRepo.UPDATE_CURRENT_LOCATION:
      return merge(prevLocation, action.payload);
    default:
      return prevLocation;
  }
};

// any state not yet categorized
const dataReducer = (prevData = {}, action) => {
  switch (action.type) {
    case actionRepo.UPDATE_DATA:
      return merge(prevData, action.payload);
    default:
      return prevData;
  }
};

const currentWeatherReducer = (prevWeather = [], action) => {
  switch (action.type) {
    case actionRepo.FETCH_CURRENT_WEATHER_SENT:
      return action.payload;
    case actionRepo.FETCH_CURRENT_WEATHER_SUCCEED:
      return { ...prevWeather, ...action.payload };
    case actionRepo.FETCH_CURRENT_WEATHER_ERROR:
      return {};

    default:
      return prevWeather;
  }
};

const pastWeatherReducer = (prevPastWeather = [], action) => {
  switch (action.type) {
    case actionRepo.FETCH_PAST_WEATHER_SENT:
      return prevPastWeather;
    case actionRepo.FETCH_PAST_WEATHER_SUCCEED:
      return [...prevPastWeather, action.payload];
    case actionRepo.FETCH_PAST_WEATHER_ERROR:
      return [];
    case actionRepo.CLEAR_PAST_WEATHER:
      return [];
    default:
      return prevPastWeather;
  }
};

const futureWeatherReducer = (prevFutureWeather = [], action) => {
  switch (action.type) {
    case actionRepo.FETCH_FUTURE_WEATHER_SENT:
      return prevFutureWeather;
    case actionRepo.FETCH_FUTURE_WEATHER_SUCCEED:
      return [...prevFutureWeather, action.payload];
    case actionRepo.FETCH_FUTURE_WEATHER_ERROR:
      return [];
    case actionRepo.CLEAR_FUTURE_WEATHER:
      return [];
    default:
      return prevFutureWeather;
  }
};

/* Keep the reducer as pure function - do not mutate the original state. */
// const nextState = Object.assign({}, state);
const reducer = combineReducers({
  currentLocation: currentLocationReducer,
  currentWeather: currentWeatherReducer,
  futureWeather: futureWeatherReducer,
  pastWeather: pastWeatherReducer,
  data: dataReducer
});

export default reducer;
