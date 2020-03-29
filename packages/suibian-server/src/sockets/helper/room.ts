import socketio from "socket.io";
import {
  createRoomQuery,
  joinRoomQuery,
  updateRoomNumbersQuery
} from "../../queries/room";
import {
  httpStatus,
  joinRoomPayload,
  suibianSocket,
  User
} from "@suibian/commons";
import { sendError, broadcastRoom } from "./messaging";
import { listSocketsRoom } from "./utils";

const socketUserMapping = new Map<string, User>();

export const joinRoom = async (
  socket: suibianSocket,
  socketio: socketio.Server,
  data: joinRoomPayload
) => {
  const { roomCode } = data;
  const { username, isOwner } = data.user;
  await joinRoomQuery(username, roomCode);
  await updateRoomNumbersQuery(roomCode, 1); // increment the number of people in the room

  socketUserMapping.set(socket.id, {
    username,
    isOwner
  });

  //list all sockets
  socket.join(data.roomCode, async () => {
    const socketList = listSocketsRoom(socketio, roomCode, socketUserMapping);
    console.log(`the socket list is ${socketList}`);
    await broadcastRoom(
      socketio,
      {
        roomCode,
        payload: socketList
      },
      "joinRoom" //broadcast using joinRoom socket command
    );
  });
};

export const createRoom = async (
  socket: suibianSocket
): Promise<string | void> => {
  const roomCode = await createRoomQuery();

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

export const startRoom = (io: socketio.Server, roomCode: string) => {
  //TODO Add in entries in the database & change room status
};
