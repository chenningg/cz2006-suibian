import SocketIOServer from "socket.io";

export type socketCommands =
    | "joinRoom"
    | "createRoom"
    | "StartRoom"
    | "changeUsername"
    | "broadcastMessage"
    | "connection"
    | "disconnect"
    | "error";

export type joinRoomPayload = {
    username: string;
    roomcode: string;
};

export type roomMessagePayload = {
    username: string;
    message: string;
    roomcode: string;
};

export interface suibianSocketServer extends SocketIOServer.Socket {
    emit(event: socketCommands, data: any): boolean;
}
