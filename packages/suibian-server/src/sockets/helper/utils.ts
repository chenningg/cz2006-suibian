import socketio from "socket.io";
import { User } from "@suibian/commons";
export const listSocketsRoom = (
    io: socketio.Server,
    roomCode: string,
    socketMapping: Map<string, User>
) => {
    const socketList = Object.keys(io.sockets.sockets);
    const socketUsernameList = socketList.map((elemnt: string) => {
        return socketMapping.get(elemnt); //convert from a list of socketid to socket usernames
    });
    return socketUsernameList;
};
