import { Vote } from "./Vote";

export type Votes = {
  username: string;
  roomCode: string;
  votes: Vote[];
};
