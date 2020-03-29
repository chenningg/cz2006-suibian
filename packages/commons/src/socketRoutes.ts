import SocketIOServer from "socket.io";
import { User } from "./User";
import { httpStatus } from "./httpStatus";

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
  user: User;
};

export type joinRoomPayload = {
  roomCode: string;
  user: User;
};

export type roomMessagePayload = {
  username: string;
  message: string;
  roomCode: string;
};

export type errorPayload = {
  statusCode: httpStatus;
  errorMessage: string;
};

export interface suibianSocket extends SocketIOServer.Socket {
  emit(
    event: socketCommands,
    data:
      | roomPayloadBase
      | roomMessagePayload
      | roomMessagePayload
      | errorPayload,
    callback?: (params?: any) => void
  ): boolean;
}

export interface suibianSocketClient extends SocketIOClient.Socket {
  emit(
    event: socketCommands,
    data: createRoomPayload | joinRoomPayload,
    callback?: (params?: any) => void
  ): SocketIOClient.Socket;
}
