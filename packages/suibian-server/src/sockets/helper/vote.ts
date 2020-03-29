import socketio from "socket.io";
import { createVoteQueryPerUser, countVoteQuery } from "../../queries/vote";
import { httpStatus, votePayload, suibianSocket } from "@suibian/commons";

export const submitVote = async (
  socketio: socketio.Server,
  socket: suibianSocket,
  data: votePayload
) => {
  const roomCode = data.roomCode;
  const username = data.username;
  const votes = data.votes;
  createVoteQueryPerUser(data);
};
