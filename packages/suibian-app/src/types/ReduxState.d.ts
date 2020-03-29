import { SocketState } from "./SocketState";

type ReduxState = {
  users: User[];
  userPreferences: Preference[];
  socketState: SocketState;
  votes: Votes;
  foods: Food[];
};

export default ReduxState;
