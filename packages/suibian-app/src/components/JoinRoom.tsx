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
        roomCode: "",
        username: ""
    };

    // Methods passed in as props
    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Joining room...");
        this.setState({
            roomCode: "",
            username: ""
        });
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                        <form
                            className="join-room-form"
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <input
                                type="text"
                                onChange={e => this.handleChange(e)}
                                id="roomCode"
                                placeholder="Room code"
                                className="username-input"
                                autoComplete="off"
                                required
                                value={this.state.roomCode}
                            />
                            <br></br>
                            <input
                                type="text"
                                onChange={e => this.handleChange(e)}
                                id="username"
                                placeholder="Username"
                                className="username-input"
                                autoComplete="off"
                                required
                                value={this.state.username}
                            />
                            <br></br>
                            {/* <Link to="/roomlobby" className="join-room-text"> */}
                            <button>JOIN ROOM</button>
                            {/* </Link> */}
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default JoinRoom;
