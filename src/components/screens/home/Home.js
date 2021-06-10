import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { LeftPane } from "./leftpane/LeftPane";
import { RightPane } from "./rightpane/RightPane";

import {
  updateCurrentLocation,
  updateCurrentWeather
} from "../../redux/action/actions";
import "./HomeStyle.css";

class Home extends Component {
  componentDidMount() {
    // auto update date time every 1 half an hour
    this.interval = setInterval(() => {
      const lat = this.props.currentLocation.coordinate.lat;
      const long = this.props.currentLocation.coordinate.long;

      let today = new Date();
      today.setDate(today.getDate() + 1);
      this.props.updateCurrentWeather({ lat, long }, today);
    }, 1800000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 3.5 }}>
          <LeftPane />
        </div>
        <div style={{ flex: 6.5 }}>
          <RightPane />
        </div>
      </div>
    );
  }
}

// ---------- Setup Redux -------------
const mapStateToProps = store => ({
  currentLocation: store.currentLocation,
  currentWeather: store.currentWeather
});

const mapDispatchToProps = {
  updateCurrentLocation,
  updateCurrentWeather
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
