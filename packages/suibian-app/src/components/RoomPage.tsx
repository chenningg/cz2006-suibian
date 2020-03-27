import React, { Component, ChangeEvent } from "react";
import "../css/RoomPage.css";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

class RoomPage extends Component {
  //State
  state = {
    roomCode: "0000"
  };

  //Variables
  roomCode = "0000";

  names: Array<Name> = [
    { numbers: "\xa01. ", displayname: "", id: 1 },
    { numbers: "\xa02. ", displayname: "", id: 2 },
    { numbers: "\xa03.", displayname: "", id: 3 },
    { numbers: "\xa04.", displayname: "", id: 4 },
    { numbers: "\xa05.", displayname: "", id: 5 },
    { numbers: "\xa06.", displayname: "", id: 6 },
    { numbers: "\xa07.", displayname: "", id: 7 },
    { numbers: "\xa08.", displayname: "", id: 8 },
    { numbers: "\xa09.", displayname: "", id: 9 },
    { numbers: "10.", displayname: "", id: 10 }
  ];

  namelist = this.names.map(name => (
    <div
      className="name flex-container flex-row flex-spaced-between"
      key={name.numbers}
    >
      <p className="name-type">{name.numbers}</p>
      <label className="name-container">
        <input
          type="text"
          id={name.numbers}
          className="name-container-text"
          value={name.displayname}
          onChange={e => {
            this.onChange(e);
          }}
        />
      </label>
    </div>
  ));

  // Methods
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.id]: e.target.checked
    });
    this.setState({
      showModal: false
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="roompage">
          <div className="app-content flex-container flex-col flex-center-v flex-center-h">
            <div className="room-code">
              <h1>Room Code: {this.roomCode} </h1>
            </div>
            <Box className="room-page-display flex-container flex-col flex-center-v flex-spaced-around">
              {this.namelist}
            </Box>
            <button>
              <Link
                to="instruction-page"
                className="start-room"
                style={{ textDecoration: "none" }}
              >
                START ROOM
              </Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default RoomPage;
