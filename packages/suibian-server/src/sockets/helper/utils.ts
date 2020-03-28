import socketio from "socket.io";
export const listSocketsRoom = (io: socketio.Server, roomcode: string) => {
    return Object.keys(io.sockets.sockets);
};
