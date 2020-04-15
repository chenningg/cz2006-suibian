import socketio from "socket.io";
import { User } from "@suibian/commons";
export const listSocketsRoomUsers = (
  io: socketio.Server,
  roomCode: string,
  socketMapping: Map<string, User>
) => {
  const socketList = Object.keys(getIoRoom(io, roomCode).sockets);
  const socketUsernameList = socketList.map((elemnt: string) => {
    return socketMapping.get(elemnt); //convert from a list of socketid to socket usernames
  });
  return socketUsernameList;
};

export const listSocketsRoomSocketId = (
  io: socketio.Server,
  roomCode: string
): string[] => {
  const socketList = Object.keys(getIoRoom(io, roomCode).sockets);
  return socketList;
};

const getIoRoom = (io: socketio.Server, roomCode: string) => {
  return io.sockets.adapter.rooms[roomCode];
};
