import React, { Component } from "react";
import "../css/PageBase.css";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";
import socketIOClient from "socket.io-client";
import { socketCommands } from "@suibian/commons";

export type socketState = {
    endpoint: string;
    socket: suibianSocket | null;
    userName: string;
    roomcode: number;
};

interface suibianSocket extends SocketIOClient.Socket {
    emit(event: socketCommands, data: any): SocketIOClient.Socket;
}

class CreateRoom extends Component<{}, socketState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            endpoint: "http://localhost:4000/",
            socket: null,
            userName: "",
            roomcode: 0
        };
    }

    onChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        {
            /* 
          // @ts-ignore */
            this.setState({ [name]: value });
        }
    };

    connectSocket = async () => {
        if (this.state.socket) {
            console.log("socket is already conencted");
            return;
        }

        // initializing the connection
        const { endpoint } = this.state;
        const socket = await socketIOClient(endpoint);
        console.log("socket created");
        this.setState({ socket });
    };

    registerSocketListeners = () => {
        console.log(this.state.socket);
        if (this.state.socket) {
            console.log("registering socket listeners");
            this.state.socket.on("createRoom", (data: any) => {
                console.log(data);
            });
        }
    };

    changeUsername = () => {
        if (this.state.socket) {
            this.state.socket.emit("changeUsername", {
                userName: this.state.userName,
                message: this.state.userName
            });
        }
    };

    createRoom = () => {
        if (this.state.socket) {
            this.changeUsername();
            this.state.socket.emit("createRoom", {
                userName: this.state.userName,
                roomcode: this.state.roomcode
            });
        }
    };

    componentDidMount() {
        this.connectSocket().then(() => this.registerSocketListeners());
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-container">
                    <div className="navbar-container">
                        <NavBar />
                    </div>
                    <div className="page-container">
                        <p>Username: </p>
                        <form>
                            <input
                                onChange={this.onChange}
                                name="userName"
                                placeholder="userName"
                            />
                            <button type="button" onClick={this.createRoom}>
                                Create Room
                            </button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateRoom;
