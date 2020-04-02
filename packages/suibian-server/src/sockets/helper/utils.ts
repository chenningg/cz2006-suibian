import socketio from "socket.io";
import { User } from "@suibian/commons";
export const listSocketsRoom = (
  io: socketio.Server,
  roomCode: string,
  socketMapping: Map<string, User>
) => {
  console.log(io.sockets.adapter.rooms[roomCode].sockets);
  const socketList = Object.keys(getIoRoom(io, roomCode).sockets);
  const socketUsernameList = socketList.map((elemnt: string) => {
    return socketMapping.get(elemnt); //convert from a list of socketid to socket usernames
  });
  return socketUsernameList;
};

const getIoRoom = (io: socketio.Server, roomCode: string) => {
  return io.sockets.adapter.rooms[roomCode];
};
