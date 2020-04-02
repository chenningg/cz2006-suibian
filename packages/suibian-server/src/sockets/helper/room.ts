import socketio from "socket.io";
import { createRoomQuery, updateRoomNumbersQuery } from "../../queries/room";
import {
  httpStatus,
  joinRoomPayload,
  suibianSocket,
  User,
  Position,
  VotingStatus
} from "@suibian/commons";
import { sendError, broadcastRoom } from "./messaging";
import { foodImageQuery } from "../../queries/food";
import { getRoomJoinQuery, joinRoomQuery } from "../../queries/join";
import { listSocketsRoom } from "./utils";
import Join from "../../models/join.model";

const socketUserMapping = new Map<string, User>();

export const joinRoom = async (
  socket: suibianSocket,
  socketio: socketio.Server,
  data: joinRoomPayload
) => {
  const { roomCode } = data;
  const { username, isOwner } = data.user;

  //TODO check whether room exist

  // update the database rooms
  await joinRoomQuery(username, roomCode);
  await updateRoomNumbersQuery(roomCode, 1); // increment the number of people in the room

  socketUserMapping.set(socket.id, {
    username,
    isOwner
  });

  //Update the socket.io rooms
  socket.join(data.roomCode, async () => {
    const users = listSocketsRoom(socketio, roomCode, socketUserMapping);
    console.log(`the socket list is ${users}`);
    await broadcastRoom(
      socketio,
      {
        roomCode,
        payload: { roomCode, users }
      },
      "joinRoom" //broadcast using joinRoom socket command
    );
  });
};

export const createRoom = async (
  socket: suibianSocket,
  position: Position
): Promise<string | void> => {
  const roomCode = await createRoomQuery(position);

  if (roomCode) {
    socket.join(roomCode, () => {
      socket.emit("createRoom", { roomCode });
    });
    return roomCode;
  } else {
    sendError(
      socket,
      httpStatus.badRequest,
      "No more spare rooms left to join"
    );
  }
};

export const getRoomSockets = (
  socketio: socketio.Server,
  roomCode: string
): socketio.Room => {
  const room = socketio.sockets.adapter.rooms[roomCode];
  return room;
};

export const closeRoom = (
  socketio: socketio.Server,
  socket: suibianSocket,
  roomCode: string
) => {
  //TODO Remove room from the database
  const roomInfo = getRoomSockets(socketio, roomCode);
  if (!roomInfo) {
    sendError(
      socket,
      httpStatus.badRequest,
      "Room could not close because room code does not exist"
    );
    return;
  }
  const socketList = Object.keys(roomInfo["sockets"]);
  socketList.forEach(socketId => {
    const socket = socketio.sockets.connected[socketId];
    socket.leave(roomCode, () => {
      socketio.in(roomCode).emit("broadcastMessage", {
        username: "null",
        message: "room is closed",
        roomCode: roomCode
      });
    });
    console.log(`socket rooms ${socketio.sockets.adapter.rooms[roomCode]}`);
  });
};

export const startRoom = async (io: socketio.Server, roomCode: string) => {
  //TODO Add in entries in the database & change room status
  const foodArrayString = await foodImageQuery(50);
  if (foodArrayString != null) {
    const foodArray = JSON.parse(foodArrayString);
    return foodArray;
  } //array of Food JSON objects
  else return null;
};

export const checkRoomCompleted = async (roomCode: string) => {
  const joinRoomInfo = await getRoomJoinQuery(roomCode);
  if (joinRoomInfo) {
    for (let i = 0; i < joinRoomInfo.length; i++) {
      let joinRoom = joinRoomInfo[i];
      console.log(joinRoom.username, joinRoom.votingstatus);
      if (joinRoom.votingstatus !== VotingStatus.completed) {
        return false;
      }
    }
    return true;
  }
};
