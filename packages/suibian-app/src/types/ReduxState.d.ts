import { SocketState } from "./SocketState";

type ReduxState = {
  users: User[];
  userPreferences: Preference[];
  socketState: SocketState;
  votes: Vote[];
};

export default ReduxState;
