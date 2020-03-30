//app components
import React from "react";
import NavBar from "./NavBar";

import Loader from "react-loader-spinner";

function RoomLobbyLoadingScreen() {
  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={{ marginTop: "20px" }}>
          <h1>Getting the room ready...</h1>
        </div>
        <div className="loader">
          <Loader type="ThreeDots" color="#c92c2c" />
        </div>
      </div>
    </>
  );
}

export default RoomLobbyLoadingScreen;
