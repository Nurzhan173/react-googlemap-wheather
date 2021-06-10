import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import ReactAnimatedWeather from "react-animated-weather";
import _ from "lodash";
import { updateCurrentWeather } from "../../../../redux/action/actions";
import { epochToDate, epochToTime, getTimeZone } from "../../../../utils/utils";
import moment from "moment";

class WeatherToday extends React.Component {
  render() {
    let myIcon = "rain";
    let myTime = "...";
    let myForecast = "...";
    let myTempHigh = "...";
    let myTempLow = "...";
    let myCurrentTemp = "...";
    let currentDate = "...";
    let timeZone = "...";
    let sunRiseTime = "",
      sunSetTime = "";

    if (this.props.currentWeather.isFetched) {
      const indexDate = 0;
      const offset = this.props.currentWeather.offset;
      myIcon = this.props.currentWeather.currently.icon;
      myForecast = this.props.currentWeather.currently.summary;
      // myForecast = this.props.currentWeather.daily.data[indexDate].summary;
      myCurrentTemp = this.props.currentWeather.currently.temperature;
      myTempHigh = this.props.currentWeather.daily.data[indexDate]
        .temperatureHigh;
      myTempLow = this.props.currentWeather.daily.data[indexDate]
        .temperatureLow;

      currentDate = epochToDate(
        this.props.currentWeather.currently.time,
        offset
      );
      // currentDate = dateFormat(currentDate, "fullDate");
      // currentDate = dateFormat(currentDate, "dddd, mmmm dS, yyyy, h:MM:ss");
      currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
      const lat = this.props.currentLocation.coordinate.lat;
      const long = this.props.currentLocation.coordinate.long;
      timeZone = this.props.currentWeather.timezone;

      sunRiseTime =
        epochToTime(
          this.props.currentWeather.daily.data[indexDate].sunriseTime,
          offset
        ) + " AM";
      sunSetTime =
        epochToTime(
          this.props.currentWeather.daily.data[indexDate].sunsetTime,
          offset
        ) + " PM";
    }

    return (
      <div style={{ overflow: "auto" }}>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ padding: "10px" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: `25px`,
                float: "left",
                clear: "left"
              }}
            >
              {_.startCase(this.props.currentLocation.address)}
            </div>

            <div
              style={{
                color: "black",
                float: "left",
                clear: "left",
                paddingTop: "10px"
              }}
            >
              <ReactAnimatedWeather
                icon={myIcon.toUpperCase().replace(/-/g, "_")}
                color={"black"}
                size={50}
                animate={true}
              />
            </div>

            <table style={{ float: "left", clear: "left", textAlign: "left" }}>
              <tbody>
                <tr>
                  <td>
                    lat: {this.props.currentLocation.coordinate.lat}, long:{" "}
                    {this.props.currentLocation.coordinate.long}
                  </td>
                </tr>
                <tr>
                  <td>Today: {myForecast}</td>
                </tr>
                <tr>
                  <td>
                    Temp High: {myTempHigh}, Low: {myTempLow}, Current:{" "}
                    {myCurrentTemp}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ float: "right", marginTop: "35px", marginRight: "40px" }}>
            <table style={{ textAlign: "left" }}>
              <tbody>
                <tr>
                  <td style={{ width: "100px" }}>Date:</td>
                  <td>{currentDate} </td>
                </tr>
                <tr>
                  <td>Time Zone:</td>
                  <td>{timeZone}</td>
                </tr>
                <tr>
                  <td>Sunrise:</td>
                  <td>{sunRiseTime}</td>
                </tr>
                <tr>
                  <td>Sunset:</td>
                  <td>{sunSetTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// ----------- Prop-Types ------
WeatherToday.propTypes = {
  navigation: PropTypes.object
};

// ---------- Setup Redux -------------
const mapStateToProps = store => ({
  currentLocation: store.currentLocation,
  currentWeather: store.currentWeather
});

const mapDispatchToProps = {
  updateCurrentWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherToday);
