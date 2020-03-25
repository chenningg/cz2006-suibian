import socketio from "socket.io";
import shortid from "shortid";
import {
    httpStatus,
    joinRoomPayload,
    roomMessagePayload,
    suibianSocketServer
} from "@suibian/commons";

shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

export const joinRoom = (
    socket: suibianSocketServer,
    socketio: socketio.Server,
    data: joinRoomPayload
) => {
    //TODO: Add in writing to database for persistent storage
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
    socket: suibianSocketServer,
    statusCode: number,
    errorMessage: string
) => {
    socket.emit("error", {
        statusCode,
        errorMessage
    });
};

export const createRoom = (socket: suibianSocketServer) => {
    const roomcode = shortid.generate();
    socket.join(roomcode, () => {
        socket.emit("createRoom", Object.keys(socket.rooms));
    });
};

export const getRoomInfo = (
    socket: suibianSocketServer,
    socketio: socketio.Server,
    data: { roomcode: string }
) => {};

export const closeRoom = (socketio: socketio.Server, roomcode: string) => {
    //TODO Remove room from the database
    //TODO kick users from room
};
