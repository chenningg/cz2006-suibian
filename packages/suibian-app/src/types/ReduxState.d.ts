import { SocketState } from "./SocketState";
// import { User, Vote } from "@suibian/commons";
import Food from "@suibian/commons";

type ReduxState = {
  users: User[]; // Users in a room
  user: User; // Current user data
  socketState: SocketState;
  votes: Votes;
  foods: Food[];
};

export default ReduxState;
