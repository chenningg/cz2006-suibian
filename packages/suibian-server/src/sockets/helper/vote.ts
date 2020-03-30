import socketio from "socket.io";
import { createVoteQueryPerUser, countVoteQuery } from "../../queries/vote";
import { updateUserQuery } from "../../queries/join";
import {
  votePayload,
  suibianSocket,
  VotingStatus,
  FoodVote
} from "@suibian/commons";
import { getHawkerCenterStallName } from "../../queries/stall";
import { checkRoomCompleted } from "./room";
import { broadcastRoom } from "./messaging";

export const submitVote = async (
  socketio: socketio.Server,
  socket: suibianSocket,
  data: votePayload
) => {
  const roomCode = data.roomCode;
  const username = data.username;
  const votes = data.votes;

  //update user vote status
  await updateUserQuery(roomCode, username, {
    votingstatus: VotingStatus.completed
  });
  const returnVotes = await createVoteQueryPerUser(data); //log to database

  if (await checkRoomCompleted(roomCode)) {
    const recommendations = await makeRecommendation(roomCode, 3);
    const dataEmit = {
      roomCode,
      payload: recommendations
    };
    broadcastRoom(socketio, dataEmit, "updateRecommendations");
  }
  return returnVotes;
};

export function extractTopVotes(voteResult: FoodVote[], top: number) {
  let result_len = Object.keys(voteResult).length;
  let top_len = Math.min(result_len, top);
  if (top_len > 0) {
    // array of sorted keys
    let sorted_keys = Object.keys(voteResult).sort(
      (a, b) => voteResult[a] - voteResult[b]
    );
    // type definition of vote results object
    let vote_results: { [key: string]: number } = {};
    for (let i = 0; i < top_len; i++) {
      vote_results[sorted_keys[i]] = voteResult[sorted_keys[i]];
    }
    // returns Json of foodID: string and number of votes: number
    return vote_results;
  } else {
    console.log("No results found!");
  }
}

export const makeRecommendation = async (roomCode: string, top: number) => {
  const voteCount = await countVoteQuery(roomCode); //tally the votes in the room
  console.log(voteCount);
  if (voteCount) {
    const processedVotes = extractTopVotes(voteCount, top);
    if (processedVotes) {
      const stallRecommendations = await getHawkerCenterStallName(
        processedVotes
      );
      return stallRecommendations;
    }
  }
};
