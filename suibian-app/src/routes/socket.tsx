import React from "react";
import socketIOClient from "socket.io-client";

export type socketState = {
    response: boolean;
    endpoint: string;
    message: string[];
    users: string[];
    message_form: string;
    socket: SocketIOClient.Socket | null;
    username: string;
};

type socketMessage = {
    username: string;
    message: string;
};

class Socket extends React.Component<{}, socketState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://localhost:4000",
            message: [],
            message_form: "",
            socket: null,
            users: [],
            username: ""
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

    testRoutes = (e: any) => {
        fetch("/api/test").then(res => console.log(res.json()));
    };

    postMessage = () => {
        const { socket } = this.state;
        if (socket) {
            const message: socketMessage = {
                username: "testing",
                message: this.state.message_form
            };
            socket.emit("new_message", message);
        } else {
            console.log("socket not connected");
        }
    };

    connectSocket = () => {
        if (this.state.socket) {
            console.log("socket is already conencted");
            return;
        }

        // initializing the connection
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit("change_username", {
            username: this.state.username,
            message: this.state.username
        });

        // registering the methods
        socket.on("new_message", (data: socketMessage) => {
            let message_list = this.state.message;
            message_list.push(data.message);
            console.log(message_list);
            this.setState({ message: message_list });
        });
        socket.on("new_user", (data: socketMessage) => {
            let userList = this.state.users;
            userList.push(data.message);
            this.setState({ users: userList });
        });
        this.setState({ socket });
    };

    render() {
        return (
            <div className="App">
                <form>
                    <input
                        onChange={this.onChange}
                        name="username"
                        placeholder="Message to send"
                    />
                </form>

                <button onClick={this.connectSocket}>Connenct Socket</button>
                <ul>
                    {this.state.users.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                <form>
                    <input
                        onChange={this.onChange}
                        name="message_form"
                        placeholder="Message to send"
                    />
                </form>
                <button onClick={this.postMessage}>Send message</button>
                <ul>
                    {this.state.message.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <button onClick={this.testRoutes}>test Routes</button>
            </div>
        );
    }
}

export default Socket;
