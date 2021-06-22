import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { DropdownButton, Dropdown, InputGroup, FormControl } from "react-bootstrap";
import WeatherToday from "./weather-today/WeatherToday";
import Forecast from "./forecast/Forecast";
import History from "./history/History";
import store from "../../../redux/store/store";
import * as actionRepo from "../../../redux/action/actions";
import Axios from "axios";
import moment from "moment";
import { getWheaterDeg } from "../../../api-client/api-wheather";

export const RightPane = () => {

  const [wheather, setWheater] = useState();

  useEffect(() => {
    getWheaterDeg().then((response) => {
      setWheater(response);
    })
  }, [])

  return (
    <div
      id="right-pane"
      style={{
        backgroundColor: "lightblue",
        padding: "5px 10px",
      }}
    >
      <div style={{ marginTop: "300px" }}>
        {wheather &&
          <WeatherToday wheather={wheather} />}
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

  const [fields, setFields] = useState([]);

  const addFields = () => {
    Axios.post("http://localhost:3001/create", {
      DateTime: moment().format("DD/MM/YYYY"),
      OxUglerod: co,
      DioxSery: so2,
      DioxAzot: no2,
      Formaldegid: ch20,
      Fenol: c6h5oh
    }).then(() => {
      setFields([
        ...fields,
        {
          DateTime: moment().format("DD/MM/YYYY"),
          OxUglerod: co,
          DioxSery: so2,
          DioxAzot: no2,
          Formaldegid: ch20,
          Fenol: c6h5oh
        },
      ]);
    });
  };

  const getFields = () => {
    Axios.get("http://localhost:3001/airPollution").then((response) => {
      setFields(response.data);
    });
  };

  function convertTime(val) {
    let t = new Date();
    t.setSeconds(val);
    let res = t.format("dd.mm.yyyy hh:MM:ss");
    return res;
  }

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

          <button onClick={() => addFields()}>Save</button>
          <button onClick={() => getFields()}>Show</button>

          {fields && fields.length > 0 && (
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
                    <th className="tg-p8bj">Date</th>
                    <th className="tg-p8bj">DioxAzot</th>
                    <th className="tg-p8bj">DioxSery</th>
                    <th className="tg-p8bj">Fenol</th>
                    <th className="tg-p8bj">Formaldegid</th>
                    <th className="tg-p8bj">OxUglerod</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field) => {
                    return (
                      <tr key={field.id}>
                        <td>{field.DateTime}</td>
                        {/* <td>{new Date(field.DateTime)}</td> */}
                        <td>{field.DioxAzot}</td>
                        <td>{field.DioxSery}</td>
                        <td>{field.Fenol}</td>
                        <td>{field.Formaldegid}</td>
                        <td>{field.OxUglerod}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
