//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//other components
import { Link } from "react-router-dom";

//css
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
                autoComplete="off"
                required
              />
              <br></br>
              <input
                type="text"
                onChange={e => this.onChange(e)}
                id="username"
                placeholder="Username"
                className="username-input"
                autoComplete="off"
                required
              />
              <br></br>
              <Link to="/roomlobby" className="join-room-text">
                <button>JOIN ROOM</button>
              </Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default JoinRoom;
