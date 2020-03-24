import socketio from "socket.io";
import shortid from "shortid";
import { httpStatus } from "@suibian/commons";

shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

let usernameSocketMapping: { [username: string]: string } = {};

export const joinRoom = (
    socket: socketio.Socket,
    socketio: socketio.Server,
    data: joinRoomPayload
) => {
    socket.join(data.roomcode, socket => socket.emit("joinRoom", socket.rooms));
    console.log(`${data.username} joined in room ${data.roomcode}`);
    console.log(socketio.sockets.adapter.rooms);
};

export const broadcastRoom = (
    socketio: socketio.Server,
    data: roomMessagePayload
) => {
    //broadcast to all members in the room
    const { username, message, roomcode } = data;
    socketio.in(roomcode).emit("broadcastMessage", message);
};

export const sendError = (
    socket: socketio.Socket,
    statusCode: number,
    errorMessage: string
) => {
    socket.emit("error", {
        statusCode,
        errorMessage
    });
};

export const createRoom = (
    socket: socketio.Socket,
    data: { username: string }
) => {
    const username = data.username;

    if (username in Object.keys(usernameSocketMapping)) {
        sendError(socket, httpStatus.ok, "Username is already taken");
    }
    usernameSocketMapping["username"] = socket.id;

    const roomcode = shortid.generate();
    socket.join(roomcode, () => {
        socket.emit("createRoom", Object.keys(socket.rooms));
    });
};
