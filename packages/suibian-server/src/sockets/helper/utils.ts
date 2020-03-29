import socketio from "socket.io";
export const listSocketsRoom = (
  io: socketio.Server,
  roomCode: string,
  socketMapping: Map<string, string>
) => {
  const socketList = Object.keys(io.sockets.sockets);
  const socketUsernameList = socketList.map((elemnt: string) => {
    return socketMapping.get(elemnt); //convert from a list of socketid to socket usernames
  });
  return socketUsernameList;
};
