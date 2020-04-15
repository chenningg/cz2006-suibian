import SocketIOServer from "socket.io";
import { User } from "./User";
import { httpStatus } from "./httpStatus";
import { Food } from "./Food";
import { Eatery } from "./Eatery";
import { Vote, FoodVote } from "./Vote";
import { Position } from "./Position";

export type socketCommands =
  | "joinRoom"
  | "startRoom"
  | "leaveRoom"
  | "submitVote"
  | "createRoom"
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

export type voteResultPayload = {
  foodVoteResults: FoodVote[];
  eatery: Eatery[] | undefined;
  httpStatus: httpStatus;
};

export type foodArrayPayload = {
  foodArray: Food[];
  httpStatus: httpStatus;
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

export type roomUsersPayload = {
  roomCode: string;
  users: User[];
  httpStatus: httpStatus;
};

export type closeRoomPayload = {
  httpStatus: httpStatus;
  message: string;
};

export type suibianSocketPayloadList =
  | roomPayloadBase
  | roomMessagePayload
  | errorPayload
  | roomUsersPayload
  | closeRoomPayload
  | voteResultPayload
  | foodArrayPayload;

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
