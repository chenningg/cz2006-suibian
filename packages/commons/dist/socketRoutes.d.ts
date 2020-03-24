import SocketIOServer from "socket.io";
export declare type socketCommands = "joinRoom" | "createRoom" | "StartRoom" | "changeUsername" | "broadcastMessage" | "connection" | "disconnect";
export interface suibianSocketServer extends SocketIOServer.Socket {
    emit(event: socketCommands, data: any): boolean;
}
