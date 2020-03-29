//app components
import React from "react";
import NavBar from "./NavBar";

function RoomLobbyLoadingScreen() {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "20px" }}>
        <h1>Getting the room ready...</h1>
      </div>
    </>
  );
}

export default RoomLobbyLoadingScreen;
