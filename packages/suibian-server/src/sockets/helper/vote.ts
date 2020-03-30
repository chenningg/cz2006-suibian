import socketio from "socket.io";
import { createVoteQueryPerUser, countVoteQuery } from "../../queries/vote";
import { updateUserQuery } from "../../queries/join";
import {
  httpStatus,
  votePayload,
  suibianSocket,
  VotingStatus
} from "@suibian/commons";
import { getHawkerCenterStallName } from "../../queries/stall";

export const submitVote = async (
  socketio: socketio.Server,
  socket: suibianSocket,
  data: votePayload
) => {
  const roomCode = data.roomCode;
  const username = data.username;
  const votes = data.votes;

  //update user vote status
  updateUserQuery(roomCode, username, { votingstatus: VotingStatus.completed });

  //TODO check if all users in the room has voted finish

  const returnVotes = await createVoteQueryPerUser(data);
  return returnVotes;
};

export function processVoteQuery(queryresult: string, top: number) {
  let result = JSON.parse(queryresult);
  let result_len = Object.keys(result).length;
  let top_len = Math.min(result_len, top);
  if (top_len > 0) {
    // array of sorted keys
    let sorted_keys = Object.keys(result).sort((a, b) => result[a] - result[b]);
    // type definition of vote results object
    let vote_results: { [key: string]: number } = {};
    for (let i = 0; i < top_len; i++) {
      vote_results[sorted_keys[i]] = result[sorted_keys[i]];
    }
    // returns Json of foodID: string and number of votes: number
    return JSON.stringify(vote_results);
  } else {
    console.log("No results found!");
  }
}

export const makeRecommendation = async (roomCode: string, top: number) => {
  const voteCount = await countVoteQuery(roomCode); //tally the votes in the room
  if (voteCount) {
    const processedVotes = processVoteQuery(voteCount, top);
    if (processedVotes) {
      const recommendations = await getHawkerCenterStallName(processedVotes);
      return recommendations;
    }
  }
};
