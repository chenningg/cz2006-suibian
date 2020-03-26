import React, { Component, FormEvent, ChangeEvent } from "react";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import "../css/JoinRoom.css";

class JoinRoom extends Component {
  // State
  state = {
    roomCode: "0000",
    username: ""
  };

  // Methods passed in as props
  joinRoom = (e: FormEvent) => {
    e.preventDefault();
    console.log("Joining room...");
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="join-room">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Join room</h1>
            <form className="join-room-form" onSubmit={e => this.joinRoom(e)}>
              <input
                type="text"
                onChange={e => this.onChange(e)}
                id="roomCode"
                placeholder="Room code"
                className="username-input"
                required
              />
              <br></br>
              <input
                type="text"
                onChange={e => this.onChange(e)}
                id="username"
                placeholder="Username"
                className="username-input"
                required
              />
              <br></br>
              <button>Join Room</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default JoinRoom;
