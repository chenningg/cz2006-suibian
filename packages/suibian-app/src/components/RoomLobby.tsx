import React, { Component } from "react";
import User from "../types/User";
import NavBar from "./NavBar";
import ModalDialog from "./ModalDialog";
import "../css/RoomLobby.css";

class RoomLobby extends Component {
  // State
  state = {
    showModal: false,
    users: []
  };

  // Methods
  render() {
    return (
      <>
        <NavBar />
        <div className="room-lobby">
          <ModalDialog
            message="User preferences saved!"
            modalType="confirmation"
            ttl={2}
            show={this.state.showModal}
          />
        </div>
      </>
    );
  }
}

export default RoomLobby;
