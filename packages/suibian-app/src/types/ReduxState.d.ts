import { SocketState } from "./SocketState";

type ReduxState = {
  users: User[]; // Users in a room
  user: User; // Current user data
  socketState: SocketState;
};

export default ReduxState;
