import socketio from "socket.io";
import { createRoomQuery, updateRoomNumbersQuery } from "../../queries/room";
import {
  httpStatus,
  joinRoomPayload,
  suibianSocket,
  User,
  Position,
  VotingStatus,
} from "@suibian/commons";
import { broadcastRoom } from "./messaging";
import { sendMessage } from "@suibian/commons";
import { foodImageQuery } from "../../queries/food";
import {
  getRoomJoinQuery,
  joinRoomQuery,
  deleteJoinQuery,
} from "../../queries/join";
import { listSocketsRoomUsers, listSocketsRoomSocketId } from "./utils";
import Food from "../../models/food.model";

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
    isOwner,
  });

  //Update the socket.io rooms
  socket.join(data.roomCode, async () => {
    const users = listSocketsRoomUsers(socketio, roomCode, socketUserMapping);
    console.log(`the socket list is ${users}`);

    const broadcastMessage = {
      roomCode,
      users,
      httpStatus: httpStatus.ok,
    };

    await broadcastRoom(
      socketio,
      broadcastMessage,
      roomCode,
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
      sendMessage(socket, "createRoom", {
        roomCode,
        httpStatus: httpStatus.ok,
      });
    });
    return roomCode;
  } else {
    sendMessage(socket, "socketError", {
      errorMessage:
        "Error creating room! Room code is currently in use already",
      httpStatus: httpStatus.badRequest,
    });
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
    sendMessage(socket, "socketError", {
      errorMessage: "Room could not close because room code does not exist",
      httpStatus: httpStatus.badRequest,
    });
    return;
  }
  const socketList = Object.keys(roomInfo["sockets"]);
  socketList.forEach((socketId) => {
    const socket = socketio.sockets.connected[socketId];
    socket.leave(roomCode, () => {
      const broadcastMessage = {
        httpStatus: httpStatus.ok,
        message: "room is closed",
      };
      broadcastRoom(socketio, broadcastMessage, roomCode, "closeRoom");
    });
    console.log(`socket rooms ${socketio.sockets.adapter.rooms[roomCode]}`);
  });
};

export const startRoom = async (
  io: socketio.Server,
  roomCode: string
): Promise<Food[] | null> => {
  //TODO Add in entries in the database & change room status
  const foodArrayString = await foodImageQuery(50);
  if (foodArrayString != null) {
    const foodArray = JSON.parse(foodArrayString);
    return foodArray;
  } //array of Food JSON objects
  else return null;
};

export const leaveRoom = async (
  io: socketio.Server,
  socket: suibianSocket,
  roomCode: string
) => {
  const user = socketUserMapping.get(socket.id);
  if (user) {
    //remove user from join table
    //update the number of people in room table
    await deleteJoinQuery(roomCode, user.username);
    await updateRoomNumbersQuery(roomCode, -1);

    //remove individual from hashmap and socket from socketio room
    socketUserMapping.delete(socket.id);
    console.log(
      `socketlist before deleting is ${listSocketsRoomSocketId(io, roomCode)}`
    );

    socket.leave(roomCode);

    const socketList = listSocketsRoomSocketId(io, roomCode);
    console.log(`socketlist after deleting is ${socketList}`);
    if (socketList.length >= 1 && user.isOwner) {
      //reasign owner
      const newOwnerSocketID = socketList[0];
      const newOwner = socketUserMapping.get(newOwnerSocketID);
      if (newOwner) {
        newOwner.isOwner = true;
        socketUserMapping.set(newOwnerSocketID, newOwner);
      }
    }
  }

  //send updated room participant list
  const users = listSocketsRoomUsers(io, roomCode, socketUserMapping);

  const broadcastMessage = {
    roomCode,
    users,
    httpStatus: httpStatus.ok,
  };

  await broadcastRoom(
    io,
    broadcastMessage,
    roomCode,
    "joinRoom" //broadcast using joinRoom socket command, because client side is listening for joinRoom socket command
  );

  console.log(users);
};

export const checkRoomCompleted = async (roomCode: string) => {
  const joinRoomInfo = await getRoomJoinQuery(roomCode);
  if (joinRoomInfo) {
    for (let i = 0; i < joinRoomInfo.length; i++) {
      let joinRoom = joinRoomInfo[i];
      console.log(
        `username:${joinRoom.username}, status:${joinRoom.votingstatus}`
      );
      if (joinRoom.votingstatus !== VotingStatus.completed) {
        return false;
      }
    }
    return true;
  }
};
