import SocketIOServer from "socket.io";
import { User } from "./User";
import { httpStatus } from "./httpStatus";
import { Food } from "./Food";
import { Vote } from "./Vote";
import { Position } from "./Position";

export type socketCommands =
  | "joinRoom"
  | "submitVote"
  | "createRoom"
  | "startRoom"
  | "submitVote"
  | "changeUsername"
  | "broadcastMessage"
  | "connection"
  | "disconnect"
  | "socketError"
  | "updateResult"
  | "closeRoom";

export type roomPayloadBase = {
  roomCode: string;
  httpStatus: httpStatus;
};

export type votePayload = {
  roomCode: string;
  username: string;
  votes: Vote[];
};

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
  httpStatus: httpStatus;
};

export type errorPayload = {
  errorMessage: string;
  httpStatus: httpStatus;
};

export type suibianSocketPayloadList =
  | roomPayloadBase
  | roomMessagePayload
  | errorPayload;

export interface suibianSocket extends SocketIOServer.Socket {
  emit(
    event: socketCommands,
    data: suibianSocketPayloadList,
    callback?: (params?: any) => void
  ): boolean;
}

export interface suibianSocketClient extends SocketIOClient.Socket {
  emit(
    event: socketCommands,
    data: createRoomPayload | joinRoomPayload | startRoomPayload | votePayload,
    callback?: (params?: any) => void
  ): SocketIOClient.Socket;
}
