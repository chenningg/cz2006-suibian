import { SocketState } from "./SocketState";
// import { User, Vote } from "@suibian/commons";
import { Position, Food, Recommendation, Result } from "@suibian/commons";

type ReduxState = {
  users: User[]; // Users in a room
  user: User; // Current user data
  position: Position;
  socketState: SocketState;
  votes: Vote[];
  foods: Food[];
  result: Result;
};

export default ReduxState;
