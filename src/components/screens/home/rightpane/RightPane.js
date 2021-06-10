import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { DropdownButton, Dropdown, InputGroup, FormControl } from "react-bootstrap";
import WeatherToday from "./weather-today/WeatherToday";
import Forecast from "./forecast/Forecast";
import History from "./history/History";
import store from "../../../redux/store/store";
import * as actionRepo from "../../../redux/action/actions";

export const RightPane = () => {

  return (
    <div
      id="right-pane"
      style={{
        backgroundColor: "lightblue",
        padding: "5px 10px",
      }}
    >
      <div style={{ marginTop: "300px" }}>
        <WeatherToday />
      </div>
      <div
        id="nav-buttons"
        style={{
          alignItems: "center", width: "1000px", margin: "auto"
        }}
      >
        <NavButtons />
      </div>

      <div style={{ marginBottom: "100px" }}>
        <Route exact path="/" render={() => <Forecast />} />
        <Route path="/forecast" render={() => <Forecast />} />
        <Route path="/history" render={() => <History />} />
      </div>
    </div>
  );
};

const NavButtons = () => {

  const clickForecast = () => {
    store.dispatch(actionRepo.updateData({ buttons: ["selected-button", ""] }));
  };

  const clickHistory = () => {
    store.dispatch(actionRepo.updateData({ buttons: ["", "selected-button"] }));
  };

  const buttons = store.getState().data.buttons;

  const [number, setNumber] = useState([1, 2, 3, 4, 5])
  const [selectedNumber, setSelectNumber] = useState(1);
  const Add = number.map(Add => Add)
  const handleAddrTypeChange = (e) => setSelectNumber((number[e.target.value]))

  const [co, setCo] = useState(0);
  const [so2, setSo2] = useState(0);
  const [no2, setNo2] = useState(0);
  const [ch20, setCh20] = useState(0);
  const [c6h5oh, setc6h5oh] = useState(0);

  return (
    <div>
      {/* <p>Initial wind speed: 2km/h</p> */}
      <div>
        <select
          onChange={e => handleAddrTypeChange(e)}
          className="browser-default custom-select" >
          {
            Add.map((address, key) => <option value={key}>{address}</option>)
          }
        </select>

        Number of pollutants: {selectedNumber}

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputGroup className="mb-3">

            <FormControl
              placeholder="CO (mg/m3)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setCo(e.target.value)}
            />
            <FormControl
              placeholder="SO2 (mg/m3)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setSo2(e.target.value)}
            />

            <FormControl
              placeholder="NO2 (mg/m3)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setNo2(e.target.value)}
            />

            <FormControl
              placeholder="CH20 (mg/m3)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setCh20(e.target.value)}
            />
            <FormControl
              placeholder="C6H5OH (mg/m3)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setc6h5oh(e.target.value)}
            />

          </InputGroup>
        </div>
      </div>

      <NavLink to="/forecast/page1" style={{ padding: `5px` }}>
        <button className={buttons[0]} onClick={clickForecast}>
          Forecast
        </button>
      </NavLink>
      <NavLink to="/history/page1">
        <button className={buttons[1]} onClick={clickHistory}>
          History
        </button>
      </NavLink>
    </div>
  );
};
