import socketio from "socket.io";
import shortid from "shortid";
import {
    httpStatus,
    joinRoomPayload,
    roomMessagePayload,
    suibianSocket
} from "@suibian/commons";
import { sendError } from "./messaging";

shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

export const joinRoom = (
    socket: suibianSocket,
    socketio: socketio.Server,
    data: joinRoomPayload
) => {
    //TODO: Add in writing to database for persistent storage,
    // check room status in database first before joining
    socket.join(data.roomcode, () => socket.emit("joinRoom", socket.rooms));
};

export const createRoom = (socket: suibianSocket) => {
    const roomcode = shortid.generate();
    socket.join(roomcode, () => {
        socket.emit("createRoom", Object.keys(socket.rooms));
    });
};

export const getRoomInfo = (
    socketio: socketio.Server,
    data: { roomcode: string }
) => {
    //TODO query database to extract room information
};

export const getRoomSockets = (
    socketio: socketio.Server,
    roomcode: string
): socketio.Room => {
    const room = socketio.sockets.adapter.rooms[roomcode];
    return room;
};

export const closeRoom = (
    socketio: socketio.Server,
    socket: suibianSocket,
    roomcode: string
) => {
    //TODO Remove room from the database
    const roomInfo = getRoomSockets(socketio, roomcode);
    if (!roomInfo) {
        sendError(
            socket,
            httpStatus.badRequest,
            "Room could not close because room code does not exist"
        );
        return;
    }
    const socketList = Object.keys(roomInfo["sockets"]);
    socketList.forEach(socketId => {
        const socket = socketio.sockets.connected[socketId];
        socket.leave(roomcode, () => {
            socketio.in(roomcode).emit("broadcastMessage", {
                username: "null",
                message: "room is closed",
                roomcode: roomcode
            });
        });
        console.log(`socket rooms ${socketio.sockets.adapter.rooms[roomcode]}`);
    });
};

export const startRoom = (io: socketio.Server, roomcode: string) => {
    //TODO Add in entries in the database & change room status
};
