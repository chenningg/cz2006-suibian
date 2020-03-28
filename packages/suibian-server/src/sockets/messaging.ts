import socketio from "socket.io";
import { roomMessagePayload, suibianSocket } from "@suibian/commons";

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
