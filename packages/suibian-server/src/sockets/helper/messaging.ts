import socketio from "socket.io";
import {
  suibianSocket,
  socketCommands,
  httpStatus,
  suibianSocketPayloadList
} from "@suibian/commons";

export const broadcastRoom = (
  socketio: socketio.Server,
  data: {
    roomCode: string;
    payload: any;
  },
  socketCommand: socketCommands = "broadcastMessage",
  httpstatus: any = httpStatus.ok
) => {
  //broadcast to all members in the room
  const { roomCode, payload } = data;
  let payLoadStatusAppended = {
    ...payload,
    httpStatus: httpstatus
  };

  socketio.in(roomCode).emit(socketCommand, payLoadStatusAppended); //specify with specific flag
};

//attach status code to broadccasting
export const sendMessage = (
  socket: suibianSocket,
  emitName: socketCommands,
  data: suibianSocketPayloadList
): void => {
  socket.emit(emitName, data);
};
