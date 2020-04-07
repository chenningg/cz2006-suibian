import {
  suibianSocket,
  socketCommands,
  suibianSocketPayloadList,
} from "./socketRoutes";

//attach status code to broadccasting
export const sendMessage = (
  socket: suibianSocket,
  emitName: socketCommands,
  data: suibianSocketPayloadList
): void => {
  socket.emit(emitName, data);
};
