import React, { useState } from "react";
import { withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import { connect } from "react-redux";
import { updateCurrentLocation } from "../../../../redux/action/actions";


export const path = [
  { lat: 43.2220146, lng: 76.8512485 },
  { lat: 43.3220147, lng: 76.8612486 },
  { lat: 43.4220148, lng: 76.8520146 }
];

const MapWithAMarker = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={6}
    defaultCenter={{
      lat: props.currentLocation.coordinate.lat,
      lng: props.currentLocation.coordinate.long
    }}
    center={{
      lat: props.currentLocation.coordinate.lat,
      lng: props.currentLocation.coordinate.long
    }}
  >
    <Polygon
      editable
      draggable
      path={
        [{
          lat: props.currentLocation.coordinate.lat,
          lng: props.currentLocation.coordinate.long
        },
        { lat: 43.3220147, lng: 76.8612486 },
        { lat: 43.4220148, lng: 76.8520146 },
        { lat: 43.4250148, lng: 76.8320146 },]
      }
    />

    <Marker
      position={{
        lat: props.currentLocation.coordinate.lat,
        lng: props.currentLocation.coordinate.long
      }}
    />
  </GoogleMap>
));

// ---------- Setup Redux -------------
const mapStateToProps = store => ({
  currentLocation: store.currentLocation,
  store
});

const mapDispatchToProps = {
  updateCurrentLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapWithAMarker);
