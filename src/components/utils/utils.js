/* jshint esversion: 6 */
import * as config from "../config/config";
import { store } from "../redux/store/store";
import moment from "moment"
export const addKeys = (val, key) => ({ key: "" + key, ...val });

export const epochToDate = (epochTime, offset) => {
  const offsetValue = parseInt(offset) * 60 * 60;
  const date = new Date((epochTime + offsetValue) * 1000);
  const iso = date
    .toISOString()
    .match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
  return iso[1];
};

export const timeStampToDate = (epochTime) => {
  return moment.unix(epochTime).format("MM/DD/YYYY");;
}

export const epochToDateTime = (epochTime, offset) => {
  const offsetValue = parseInt(offset) * 60 * 60;
  const date = new Date((epochTime + offsetValue) * 1000);
  const iso = date
    .toISOString()
    .match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
  return iso[1] + " " + iso[2];
};

export const epochToTime = (epochTime, offset) => {
  const offsetValue = parseInt(offset) * 60 * 60;
  const date = new Date((epochTime + offsetValue) * 1000);
  const iso = date
    .toISOString()
    .match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
  return iso[2];
};

export const dateToEpoch = (dateParam, offset) => {
  const epoch = new Date(dateParam).getTime() / 1000;
  return epoch;
};

export const getFuture30Dates = baseDate => {
  let future30Dates = [];
  const epochTime = baseDate.getTime();
  for (let i = 1; i <= config.maxRecords; i++) {
    let myDate = new Date(epochTime);
    myDate.setDate(myDate.getDate() + i);
    console.assert(myDate instanceof Date, "myDate must be of type Date");
    future30Dates.push(myDate);
  }
  return future30Dates;
};

export const getPrevious30Dates = baseDate => {
  let prev30Dates = [];
  const epochTime = baseDate.getTime();
  for (let i = config.maxRecords; i >= 1; i--) {
    let myDate = new Date(epochTime);
    myDate.setDate(myDate.getDate() - i);
    console.assert(myDate instanceof Date, "myDate must be of type Date");
    prev30Dates.push(myDate);
  }

  return prev30Dates.sort(function (a, b) {
    return b.getTime() - a.getTime();
  });
};

export function generateEmptyArray(size) {
  let myarr = new Array(size);
  for (let i = 0; i < myarr.length; i++) {
    myarr[i] = "";
  }
  return myarr;
}

export function paginateRecords(recordsParam) {
  const addKeys = (val, key) => ({ key: key + 1, ...val });

  let records = recordsParam.map(record => ({ date: record })).map(addKeys);
  const pagesTotal = getNumberOfPages(records, config.recordsPerPage);

  let paginated = [];

  for (let i = 1; i <= records.length; i++) {
    let index = parseInt(i / config.recordsPerPage);
    if (i % config.recordsPerPage === 0) index--;
    paginated.push({ page: index + 1, ...records[i - 1] });
  }

  return paginated;

  //------- internal functions --------------
  function getNumberOfPages(records, recordsPerPage) {
    let pages = 0;

    if (records.length > 0) {
      pages = parseInt(records.length / recordsPerPage);
      const modulo = records.length % recordsPerPage;
      modulo !== 0 && pages++;
    }
    return pages;
  }
}

export const loadPastWeatherByPage = async (pageNo, props) => {
  const lat = props.currentLocation.coordinate.lat;
  const long = props.currentLocation.coordinate.long;
  const address = props.currentLocation.address;

  await props.clearPastWeather();
  let pastDates = getPrevious30Dates(new Date());
  pastDates = paginateRecords(pastDates).filter(date => date.page === pageNo);

  pastDates.forEach(date => {
    props.updatePastWeather({ lat, long }, date.date, pageNo); // current Weather
  });
};

export const loadFutureWeatherByPage = async (pageNo, props) => {
  const lat = props.currentLocation.coordinate.lat;
  const long = props.currentLocation.coordinate.long;
  const address = props.currentLocation.address;

  await props.clearFutureWeather();
  let futureDates = getFuture30Dates(new Date());
  futureDates = paginateRecords(futureDates).filter(
    date => date.page === pageNo
  );

  futureDates.forEach(date => {
    props.updateFutureWeather({ lat, long }, date.date, pageNo); // current Weather
  });
};
