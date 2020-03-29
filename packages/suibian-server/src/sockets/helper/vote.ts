import socketio from "socket.io";
import {
  createVoteQueryPerUser,
  countVoteQuery
} from "../../queries/vote";
import {
  httpStatus,
  votePayload,
  suibianSocket,
} from "@suibian/commons";

export const submitVote = async (
  socketio: socketio.Server,
  socket: suibianSocket,
  data: votePayload
) => {
  const roomCode = data.roomCode;
  const username = data.username;
  const votes = data.votes;
  createVoteQueryPerUser(data);
}

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

export const startRoom = async (io: socketio.Server, roomCode: string) => {
  //TODO Add in entries in the database & change room status
  const foodArrayString = await foodImageQuery(50);
  if (foodArrayString != null) {
    const foodArray = JSON.parse(foodArrayString);
    return foodArray;
  } //array of Food JSON objects
  else return null;
};
