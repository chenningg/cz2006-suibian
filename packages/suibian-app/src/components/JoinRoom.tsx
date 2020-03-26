import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";
import "../css/JoinRoom.css";
import { Link } from "react-router-dom";

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
              <button>
                <Link
                  to="/roompage"
                  className="join-room-text"
                  style={{ textDecoration: "none" }}
                >
                  JOIN ROOM
                </Link>
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default JoinRoom;
