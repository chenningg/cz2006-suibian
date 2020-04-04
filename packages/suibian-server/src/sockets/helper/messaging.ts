import socketio from "socket.io";
import {
  suibianSocket,
  socketCommands,
  httpStatus,
  suibianSocketPayloadList,
} from "@suibian/commons";

export const broadcastRoom = (
  socketio: socketio.Server,
  data: suibianSocketPayloadList,
  roomCode: string,
  socketCommand: socketCommands = "broadcastMessage"
) => {
  socketio.in(roomCode).emit(socketCommand, data); //specify with specific flag
};

//attach status code to broadccasting
export const sendMessage = (
  socket: suibianSocket,
  emitName: socketCommands,
  data: suibianSocketPayloadList
): void => {
  socket.emit(emitName, data);
};
