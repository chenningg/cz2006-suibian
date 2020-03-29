import socketio from "socket.io";
import { suibianSocket, socketCommands, httpStatus } from "@suibian/commons";

export const broadcastRoom = (
    socketio: socketio.Server,
    data: {
        roomCode: string;
        payload: any;
    },
    socketCommand?: socketCommands
) => {
    //broadcast to all members in the room
    const { roomCode, payload } = data;
    if (socketCommand) {
        socketio.in(roomCode).emit(socketCommand, payload); //specify with specific flag
    } else {
        socketio.in(roomCode).emit("broadcastMessage", payload);
    }
};

export const sendError = (
    socket: suibianSocket,
    statusCode: httpStatus,
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
