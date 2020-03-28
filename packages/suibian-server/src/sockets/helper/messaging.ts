import socketio from "socket.io";
import { suibianSocket, socketCommands } from "@suibian/commons";

export const broadcastRoom = (
    socketio: socketio.Server,
    data: {
        roomcode: string;
        payload: any;
    },
    socketCommand?: socketCommands
) => {
    //broadcast to all members in the room
    const { roomcode, payload } = data;
    if (socketCommand) {
        socketio.in(roomcode).emit(socketCommand, payload); //specify with specific flag
    } else {
        socketio.in(roomcode).emit("broadcastMessage", payload);
    }
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
