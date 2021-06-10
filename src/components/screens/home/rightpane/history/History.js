import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactAnimatedWeather from "react-animated-weather";
import { Route, NavLink } from "react-router-dom";

import * as utils from "../../../../utils/utils";
import * as config from "../../../../config/config";
import * as actionRepo from "../../../../redux/action/actions";

class History extends React.Component {
  clickPage = pageNo => {
    utils.loadPastWeatherByPage(pageNo, this.props);

    let pastPages = utils.generateEmptyArray(7);
    pastPages[pageNo] = "selected-button";
    this.props.updateData({ pastPages });
  };

  render() {
    if (this.props.pastWeather.length < config.recordsPerPage) {
      //display loading page
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            <div>
              <svg
                width="200px"
                height="200px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                className="lds-wedges"
                style={{ background: "none" }}
              >
                <g transform="translate(50,50)">
                  <g
                    ng-attr-transform="scale({{config.scale}})"
                    transform="scale(0.7)"
                  >
                    <g transform="translate(-50,-50)">
                      <g transform="rotate(168 50 50)">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          calcMode="linear"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                          dur="0.75s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                        <path
                          ng-attr-fill-opacity="{{config.opacity}}"
                          ng-attr-fill="{{config.c1}}"
                          d="M50 50L50 0A50 50 0 0 1 100 50Z"
                          fillOpacity="0.8"
                          fill="#f05125"
                        />
                      </g>
                      <g transform="rotate(216 50 50)">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          calcMode="linear"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                          dur="1s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                        <path
                          ng-attr-fill-opacity="{{config.opacity}}"
                          ng-attr-fill="{{config.c2}}"
                          d="M50 50L50 0A50 50 0 0 1 100 50Z"
                          transform="rotate(90 50 50)"
                          fillOpacity="0.8"
                          fill="#fdb813"
                        />
                      </g>
                      <g transform="rotate(264 50 50)">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          calcMode="linear"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                          dur="1.5s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                        <path
                          ng-attr-fill-opacity="{{config.opacity}}"
                          ng-attr-fill="{{config.c3}}"
                          d="M50 50L50 0A50 50 0 0 1 100 50Z"
                          transform="rotate(180 50 50)"
                          fillOpacity="0.8"
                          fill="#7fbb42"
                        />
                      </g>
                      <g transform="rotate(312 50 50)">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          calcMode="linear"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                          dur="3s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                        <path
                          ng-attr-fill-opacity="{{config.opacity}}"
                          ng-attr-fill="{{config.c4}}"
                          d="M50 50L50 0A50 50 0 0 1 100 50Z"
                          transform="rotate(270 50 50)"
                          fillOpacity="0.8"
                          fill="#32a0da"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    }

    this.props.pastWeather.sort(function (a, b) {
      return b.daily.data[0].time - a.daily.data[0].time;
    });
    const pages = this.props.data.pastPages;
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              clear: "left",
              marginBottom: "5px"
            }}
          >
            <NavLink to="/history/page1">
              <button
                className={pages[1]}
                onClick={() => {
                  this.clickPage(1);
                }}
              >
                1
              </button>
            </NavLink>
            <NavLink to="/history/page2">
              <button
                className={pages[2]}
                onClick={() => {
                  this.clickPage(2);
                }}
              >
                2
              </button>
            </NavLink>
            <NavLink to="/history/page3">
              <button
                className={pages[3]}
                onClick={() => {
                  this.clickPage(3);
                }}
              >
                3
              </button>
            </NavLink>
            <NavLink to="/history/page4">
              <button
                className={pages[4]}
                onClick={() => {
                  this.clickPage(4);
                }}
              >
                4
              </button>
            </NavLink>
            <NavLink to="/history/page5">
              <button
                className={pages[5]}
                onClick={() => {
                  this.clickPage(5);
                }}
              >
                5
              </button>
            </NavLink>
            <NavLink to="/history/page6">
              <button
                className={pages[6]}
                onClick={() => {
                  this.clickPage(6);
                }}
              >
                6
              </button>
            </NavLink>
          </div>
        </div>
        <div
          style={{
            clear: "left",
            display: "flex",
            justifyContent: "center",
            textAlign: "left"
          }}
        >
          <table className="tg">
            <thead>
              <tr>
                <th className="tg-yw4l" />
                <th className="tg-p8bj">Date</th>
                <th className="tg-p8bj">Summary</th>
                <th className="tg-p8bj">Temp High</th>
                <th className="tg-p8bj">Temp Low</th>
                <th className="tg-9hbo">Sunrise</th>
                <th className="tg-9hbo">Sunset</th>
                <th className="tg-9hbo">Humidity</th>
                <th className="tg-9hbo">Visibility</th>
                <th className="tg-9hbo">Wind Speed</th>
                <th className="tg-9hbo">Wind Gust</th>
                <th className="tg-9hbo">Icon</th>
              </tr>
            </thead>
            <tbody>
              {this.props.pastWeather.map((weather, index) => {
                const pageNo = weather.pageNo;
                const pageRecordSize = weather.pageRecordSize;
                let count =
                  pageNo * pageRecordSize -
                  (pageRecordSize - parseInt(index)) +
                  1;
                // count = pageNo===1? count :  count + (weather.pageNo);
                const offset = weather.offset;
                let myIcon = weather.daily.data[0].icon
                  .toUpperCase()
                  .replace(/-/g, "_");
                return (
                  <tr key={index}>
                    <td>{count}</td>
                    <td>
                      {utils.epochToDate(weather.daily.data[0].time, offset)}
                    </td>
                    <td>{weather.daily.data[0].summary}</td>
                    <td>{weather.daily.data[0].temperatureHigh}</td>
                    <td>{weather.daily.data[0].temperatureLow}</td>
                    <td>
                      {utils.epochToTime(
                        weather.daily.data[0].sunriseTime,
                        offset
                      ) + " AM"}
                    </td>
                    <td>
                      {utils.epochToTime(
                        weather.daily.data[0].sunsetTime,
                        offset
                      ) + " PM"}
                    </td>
                    <td>{weather.daily.data[0].humidity}</td>
                    <td>{weather.daily.data[0].visibility}</td>
                    <td>{weather.daily.data[0].windSpeed}</td>
                    <td>{weather.daily.data[0].windGust}</td>
                    <td>
                      {" "}
                      <ReactAnimatedWeather
                        icon={myIcon}
                        color={"black"}
                        size={30}
                        animate={true}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// ---------- Setup Redux -------------
const mapStateToProps = store => ({
  currentLocation: store.currentLocation,
  pastWeather: store.pastWeather,
  data: store.data
});

const mapDispatchToProps = {
  clearPastWeather: actionRepo.clearPastWeather,
  updatePastWeather: actionRepo.updatePastWeather,
  updateData: actionRepo.updateData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
