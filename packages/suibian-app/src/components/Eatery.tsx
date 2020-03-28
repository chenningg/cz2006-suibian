//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

//css
import "../css/Eatery.css";

const mapStyles = {
  width: 350,
  height: 350
};

class Eatery extends Component<{ google: string }> {
  //State
  placename = "BIG DICK LAKE";
  state = {
    lat: 47.611036,
    lng: -93.615641,
    zoom: 14.7,
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
        <NavBar backPage="recommendations" />
        <div className="eatery">
          <div className="app-content flex-container flex-col  flex-center-v">
            <h2 className="eateryname">{this.eateryname}</h2>
            <div className="map">
              <Map
                style={mapStyles}
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
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
              href={
                "https://www.google.com/maps/@" +
                this.state.lat +
                "," +
                this.state.lng +
                "," +
                this.state.zoom +
                "z"
              }
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
