import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

type OwnProps = {
  label: string;
  center: any;
  zoom: number;
};

class GoogleMap extends Component<OwnProps> {
  static defaultProps = {
    label: "Test",
    center: {
      lat: 1.3534183,
      lng: 103.69241410000001
    },
    zoom: 17
  };

  distanceToMouse = (pt, mousePos, markerProps): number => {
    // pt can be undefined in some cases
    // don't know why this happens
    if (pt && mousePos) {
      return Math.sqrt(
        (pt.x - mousePos.x) * (pt.x - mousePos.x) +
          (pt.y - mousePos.y) * (pt.y - mousePos.y)
      );
    } else {
      return -1;
    }
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: "400px",
          width: "85vw",
          minWidth: "350px",
          maxWidth: "800px"
        }}
      >
        <GoogleMapReact
          distanceToMouse={this.distanceToMouse}
          bootstrapURLKeys={{ key: "AIzaSyDEaux00JCnvfiaqExfJHY5cu-oe8fSOxA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapMarker
            lat={1.3534183}
            lng={103.69241410000001}
            label={this.props.label}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
