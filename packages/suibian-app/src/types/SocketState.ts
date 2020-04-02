//creating socket
import { suibianSocketClient } from "@suibian/commons";

export type SocketState = {
  socket: suibianSocketClient | null;
  roomCode: string;
};
