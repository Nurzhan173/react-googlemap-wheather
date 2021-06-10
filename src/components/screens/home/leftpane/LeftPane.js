import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import MapWithAMarker from "./map/MapWithAMarker";
import SearchPlace from "./searchplace/SearchPlace";

export const LeftPane = () => {
  return (
    <div id="left-pane" style={{ flexGrow: 1 }}>
      <div
        id="gmap"
        style={{
          position: "relative",
          float: "left",
          zIndex: 2,
          backgroundColor: "lightblue"
        }}
      >
        <SearchPlace />
      </div>
      <div
        style={{
          marginTop: "0",
          zIndex: 1,
          position: "relative",
          width: "100%"
        }}
      >
        <MapWithAMarker
          loadingElement={<div />}
          containerElement={
            <div style={{ height: `50vh`, minHeight: "50vh" }} />
          }
          mapElement={
            <div style={{ width: `100%`, height: `79vh`, minHeight: "79vh" }} />
          }
        />
      </div>
      <div id="bottom-gmap" style={{ paddingTop: "10px", textAlign: "center" }}>
        Photos About the Place
      </div>
    </div>
  );
};
