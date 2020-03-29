import SocketIOServer from "socket.io";

export type socketCommands =
    | "joinRoom"
    | "createRoom"
    | "StartRoom"
    | "changeUsername"
    | "broadcastMessage"
    | "connection"
    | "disconnect"
    | "socketError";

export type roomPayloadBase = {
    roomCode: string;
};

export type createRoomPayload = {
    username: string;
};

export type joinRoomPayload = {
    roomCode: string;
    username: string;
};

export type roomMessagePayload = {
    username: string;
    message: string;
    roomCode: string;
};

export interface suibianSocket extends SocketIOServer.Socket {
    emit(
        event: socketCommands,
        data: any,
        callback?: (params?: any) => void
    ): boolean;
}
