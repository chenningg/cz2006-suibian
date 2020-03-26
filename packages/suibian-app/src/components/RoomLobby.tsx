import React, { Component } from "react";
import User from "../types/User";
import NavBar from "./NavBar";
import ModalDialog from "./ModalDialog";
import "../css/RoomLobby.css";

class RoomLobby extends Component {
  // State
  state = {
    roomID: "1997",
    enoughUsers: false,
    canStart: false,
    users: []
  };

  // Methods
  render() {
    return (
      <>
        <NavBar />
        <div className="room-lobby">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Room #{this.state.roomID}</h1>
          </div>
        </div>
      </>
    );
  }
}

export default RoomLobby;
