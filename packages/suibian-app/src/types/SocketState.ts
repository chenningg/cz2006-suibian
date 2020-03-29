//creating socket
import { suibianSocketClient } from "@suibian/commons";

export type SocketState = {
  endpoint: string;
  socket: suibianSocketClient | null;
  roomCode: string;
};
