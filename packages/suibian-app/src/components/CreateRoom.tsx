//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import { Link } from "react-router-dom";

//css
import "../css/CreateRoom.css";

class CreateRoom extends Component {
  // onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   // @ts-ignore */
  //   this.setState({ [e.target.id]: e.target.value });
  // };

  // changeUsername = () => {
  //   if (this.state.socket) {
  //     this.state.socket.emit("changeUsername", {
  //       userName: this.state.username,
  //       message: this.state.username
  //     });
  //   }
  // };

  // createRoom = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (this.state.socket) {
  //     this.changeUsername();
  //     this.state.socket.emit("createRoom", {
  //       username: this.state.username,
  //       roomCode: this.state.roomCode
  //     });
  //   }
  // };

  render() {
    return (
      <>
        <NavBar />
        <div className="create-room">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Create room</h1>
            <form
              className="create-room-form"
              // onSubmit={e => this.createRoom(e)}
            >
              <input
                // onChange={e => this.onChange(e)}
                id="username"
                placeholder="Username"
                className="username-input"
                autoComplete="off"
                required
              />
              <br></br>
              <Link
                to="/roomlobby"
                className="main-menu-button remove-text-decoration center"
              >
                <button>CREATE ROOM</button>
              </Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default CreateRoom;
