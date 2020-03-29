import { SocketState } from "./SocketState";

type ReduxState = {
  users: User[]; // Users in a room
  user: User; // Current user data
  socketState: SocketState;
  votes: Vote[];
};

export default ReduxState;
