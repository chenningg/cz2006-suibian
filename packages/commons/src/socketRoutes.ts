import SocketIOServer from "socket.io";
import { User } from "./User";
import { httpStatus } from "./httpStatus";
import { Food } from "./Food";
import { Vote } from "./Vote";

export type socketCommands =
  | "joinRoom"
  | "submitVote"
  | "createRoom"
  | "startRoom"
  | "votePage"
  | "changeUsername"
  | "broadcastMessage"
  | "connection"
  | "disconnect"
  | "socketError";

export type roomPayloadBase = {
  roomCode: string;
};

export type votePayload = {
  roomCode: string;
  username: string;
  votes: Vote[];
}

export type foodArrayPayload = {
  foodArray: Food[];
};

export type createRoomPayload = {
  user: User;
  position: Position;
};

export type joinRoomPayload = {
  roomCode: string;
  user: User;
};

export type startRoomPayload = {
  roomCode: string;
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
    data: createRoomPayload | joinRoomPayload | startRoomPayload,
    callback?: (params?: any) => void
  ): SocketIOClient.Socket;
}
