import React, { useRef, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "../css/MapSearch.css";
import { LocationOn } from "@material-ui/icons";

// Sockets and Redux
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { Position } from "@suibian/commons";

// Types
type StateProps = {
  position: Position;
};

type DispatchProps = {
  updatePosition: (position: Position) => void;
};

type Props = StateProps & DispatchProps;

const MapSearch = (props: Props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  });

  // Create a stateful variable to display location string in text field
  const [currLocation, setCurrLocation] = useState("");

  // Stateful variable to log if autoLocation selected
  const [autoLocation, setAutoLocation] = useState("autoLocationOff");

  const ref = useRef();
  // @ts-ignore
  useOnclickOutside(ref, () => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
    if (autoLocation === "autoLocationOn") {
      setCurrLocation("Using current location");
    }
  });

  // If click on auto get current location, get user location and set text field to show it
  const handleClickCurrLoc = e => {
    getPosition().then((res: any) => {
      const pos = {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude
      };
      console.log("📍 Coordinates: ", pos);
      props.updatePosition(pos);
      setCurrLocation("Using current location");
      setAutoLocation("autoLocationOn");
    });
  };

  // Resets text field on click
  const handleClickInputLoc = e => {
    setCurrLocation("");
  };

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
    setCurrLocation(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    setCurrLocation(description);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        const pos = {
          latitude: lat,
          longitude: lng
        };
        console.log("📍 Coordinates: ", pos);
        props.updatePosition(pos);
        setAutoLocation("autoLocationOff");
      })
      .catch(error => {
        console.log("😱 Error: ", error);
      });
  };

  // Functions to get user's current location
  function getPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <div key={id}>
          <li onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong>
            <br></br>
            <small>{secondary_text}</small>
          </li>
          <hr></hr>
        </div>
      );
    });

  return (
    <div
      // @ts-ignore
      ref={ref}
      className="map-search-container flex-container flex-col flex-center-v flex-center-h"
    >
      <div className="map-search-input-container flex-container flex-row flex-center-h flex-center-v">
        <input
          value={currLocation}
          onChange={handleInput}
          onClick={handleClickInputLoc}
          disabled={!ready}
          placeholder="Enter your eating location"
          className="map-search-input"
        />
        <span
          className={`map-locate-me-icon-container ${autoLocation}`}
          onClick={handleClickCurrLoc}
        >
          <LocationOn className="map-locate-me-icon" />
        </span>
      </div>
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="map-search-suggestions">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    position: state.position
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updatePosition: position => {
      dispatch({
        type: "UPDATE_POSITION",
        position
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSearch);
