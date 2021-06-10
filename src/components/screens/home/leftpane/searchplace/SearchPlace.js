import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete-extended";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router'

import * as actionRepo from "../../../../redux/action/actions";
import * as utils from "../../../../utils/utils";

import "./SearchPlaceStyle.css";

class SearchPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      geocodeResults: null,
      loading: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this);
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this);
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    });
    
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("Success Yay", { lat, lng });
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        });
      })
      .catch(error => {
        console.log("Oh no!", error);
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        });
      });
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    });
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    );
  }

  renderGeocodeSuccess(lat, long) {
 
    this.props.updateCurrentLocation({
      coordinate: { lat, long },
      address: this.state.address
    });
    this.props.updateCurrentWeather({ lat, long }, new Date());
    utils.loadFutureWeatherByPage(1, this.props);

    // reset buttons
    let buttons = ["selected-button", ""];
    // pages[0] is unused
    let forecastPages = utils.generateEmptyArray(7);
    forecastPages[1] = "selected-button";

    // pages[0] is unused
    let pastPages = utils.generateEmptyArray(7);
    pastPages[1] = "selected-button";

    this.props.updateData({ buttons, forecastPages, pastPages });
  }

  render() {
    const cssClasses = {
      root: "form-group",
      input: "Demo__search-input",
      autocompleteContainer: "Demo__autocomplete-container"
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{" "}
        <small className="text-muted">
          {formattedSuggestion.secondaryText}
        </small>
      </div>
    );

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log("Blur event!");
      },
      onFocus: () => {
        console.log("Focused!");
      },
      placeholder: "Search Places",
      name: "Demo__input",
      id: "my-input-id"
    };

    return (
    
      <div id="search-place" className="page-wrapper">
        <div className="container" style={{ textAlign: "left" }}>
         <Route render={({ history}) => (
            <PlacesAutocomplete
              onSelect={()=>{history.push("/forecast");this.handleSelect(this.state.address);}}
              autocompleteItem={AutocompleteItem}
              onEnterKeyDown={()=>{history.push("/forecast");this.handleSelect(this.state.address);}}
              classNames={cssClasses}
              input={({ ...props }) => React.createElement("input", props)}
              inputProps={inputProps}
            />
          )} />
          {this.state.loading ? (
            <div>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
            </div>
          ) : null}
        </div>
      </div>
    
    );
  }
}

// ----------- Prop-Types ------
SearchPlace.propTypes = {
  navigation: PropTypes.object
};

// ---------- Setup Redux -------------
const mapStateToProps = store => ({
  currentLocation: store.currentLocation,
  store
});

const mapDispatchToProps = {
  updateCurrentLocation: actionRepo.updateCurrentLocation,
  updateCurrentWeather: actionRepo.updateCurrentWeather,
  clearPastWeather: actionRepo.clearPastWeather,
  clearFutureWeather: actionRepo.clearFutureWeather,
  updatePastWeather: actionRepo.updatePastWeather,
  updateFutureWeather: actionRepo.updateFutureWeather,
  updateData: actionRepo.updateData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPlace);
