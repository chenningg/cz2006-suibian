import { SocketState } from "./SocketState";

type ReduxState = {
  roomID: string;
  users: User[];
  userPreferences: Preference[];
  socketState: SocketState;
};

export default ReduxState;
