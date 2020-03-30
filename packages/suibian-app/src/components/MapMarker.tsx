import React from "react";
import { LocationOn } from "@material-ui/icons";
import "../css/MapMarker.css";

type OwnProps = {
  lat: number;
  lng: number;
  label: string;
};

const MapMarker = (props: OwnProps) => (
  <div className="map-marker-container">
    <span className="map-marker-label">{props.label}</span>
    <div className="map-marker-icon-container">
      <LocationOn />
    </div>
  </div>
);

export default MapMarker;
