import React, { useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "../css/MapSearch.css";
import { LocationOn } from "@material-ui/icons";

const MapSearch = () => {
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
  const ref = useRef();
  // @ts-ignore
  useOnclickOutside(ref, () => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleClick = e => {
    getPosition().then((res: any) => {
      console.log("📍 Coordinates: ", {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude
      });
      return { lat: res.coords.latitude, lng: res.coords.longitude };
    });
  };

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
        return { latitude: lat, longitude: lng };
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
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your eating location"
          className="map-search-input"
        />
        <span className="map-locate-me-icon-container" onClick={handleClick}>
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

export default MapSearch;
