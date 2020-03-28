import socketio from "socket.io";
import {
    createRoomQuery,
    joinRoomQuery,
    updateRoomNumbersQuery
} from "../../queries/room";
import { httpStatus, joinRoomPayload, suibianSocket } from "@suibian/commons";
import { sendError, broadcastRoom } from "./messaging";
import { listSocketsRoom } from "./utils";

const socketUserMapping = new Map();

export const joinRoom = async (
    socket: suibianSocket,
    socketio: socketio.Server,
    data: joinRoomPayload
) => {
    const { username, roomcode } = data;
    await joinRoomQuery(username, roomcode);
    await updateRoomNumbersQuery(roomcode, 1); // increment the number of people in the room

    socketUserMapping.set(socket.id, username);

    //list all sockets
    socket.join(data.roomcode, async () => {
        const socketList = listSocketsRoom(
            socketio,
            roomcode,
            socketUserMapping
        );
        console.log(`the socket list is ${socketList}`);
        await broadcastRoom(
            socketio,
            {
                roomcode,
                payload: socketList
            },
            "joinRoom" //broadcast using joinRoom socket command
        );
    });
};

export const createRoom = async (
    socket: suibianSocket
): Promise<string | void> => {
    const roomcode = await createRoomQuery();

    if (roomcode) {
        socket.join(roomcode, () => {
            socket.emit("createRoom", roomcode);
        });
        return roomcode;
    } else {
        sendError(
            socket,
            httpStatus.badRequest,
            "No more spare roomes left to join"
        );
    }
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
