import React, { Component } from "react";
import NavBar from "./NavBar";
import "../css/Eatery.css";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const location = {
  lat: 47.611036,
  Long: -93.615641
};
const mapStyles = {
  width: 350,
  height: 350
};

class Eatery extends Component<{ google: string }> {
  //State
  placename = "BIG DICK LAKE";
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: this.placename //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  eateryname = "Albert Food Centre";
  foodstall = "Hock Lee Fishball Noodle";

  render() {
    return (
      <>
        <NavBar />
        <div className="eatery">
          <div className="app-content flex-container flex-col  flex-center-v">
            <h2 className="eateryname">{this.eateryname}</h2>
            <div className="map">
              <Map
                style={mapStyles}
                google={this.props.google}
                zoom={14.7}
                initialCenter={{ lat: 47.611036, lng: -93.615641 }}
              >
                <Marker onClick={this.onMarkerClick} name={"bigDICKlake"} />
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace}</h4>
                  </div>
                </InfoWindow>
              </Map>
            </div>
            <a
              href="https://www.google.com/maps/@${your_lat},${your_lng},${your_desired_zoom}z"
              className="gmaps-button"
            >
              View in Maps
            </a>

            <text className="foodstall-name">{this.foodstall}</text>
            <img
              className="foodstall"
              src="https://picsum.photos/id/1062/350/200"
            ></img>
            <text className="address">
              #01-94 Albert Centre Market &amp; Food Centre
            </text>
          </div>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDEaux00JCnvfiaqExfJHY5cu-oe8fSOxA"
})(Eatery);
// <img
//   className="location"
//   style={{ alignContent: "center" }}
//   src="https://picsum.photos/id/1025/350/350"
// />;
