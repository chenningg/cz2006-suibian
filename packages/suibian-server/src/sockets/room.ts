import socketio from "socket.io";
import createRoomQuery from "../queries/rooms";
import {
    httpStatus,
    joinRoomPayload,
    roomMessagePayload,
    suibianSocket
} from "@suibian/commons";

export const joinRoom = (
    socket: suibianSocket,
    socketio: socketio.Server,
    data: joinRoomPayload
) => {
    //TODO: Add in writing to database for persistent storage
    socket.join(data.roomcode, () => socket.emit("joinRoom", socket.rooms));
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
    socket: suibianSocket,
    statusCode: number,
    errorMessage: string
) => {
    socket.emit(
        "socketError",
        {
            statusCode,
            errorMessage
        },
        err => {
            console.log(`error message is ${err}`);
        }
    );
};

export const createRoom = (socket: suibianSocket) => {
    const roomcode = createRoomQuery();
    //@ts-ignore
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
