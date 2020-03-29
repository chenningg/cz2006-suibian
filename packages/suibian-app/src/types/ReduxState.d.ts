import { SocketState } from "./SocketState";

type ReduxState = {
  users: User[];
  userPreferences: Preference[];
  socketState: SocketState;
};

export default ReduxState;
