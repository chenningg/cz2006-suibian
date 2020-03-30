import Vote from "../models/vote.model";
import { Vote as VoteType } from "@suibian/commons";
import { isColString } from "sequelize/types/lib/utils";

export const createVoteQueryPerUser = async (uservote: any) => {
  const { username, roomCode, votes } = uservote;
  // votes is an array of user vote type
  const votebulkentry = votes.map((vote: VoteType) => {
    // map calls the function once for every element in array
    // similar to foreach except it returns new array
    const voteentry = {
      username,
      roomcode: roomCode,
      foodId: vote.foodId,
      vote: vote.like
    };
    return voteentry; // return for each element in the array
  });
  await Vote.bulkCreate(votebulkentry);
  console.log("Votes passed to database");
  return votebulkentry;
};

export const countVoteQuery = async (
  roomcode: string
): Promise<string | undefined> => {
  try {
    const result = await Vote.count({
      where: {
        roomcode,
        vote: true
      },
      group: "foodId"
    });
    return JSON.stringify(result);
  } catch (err) {
    console.log(err);
  }
};

// var list = {"you": 100, "me": 75, "foo": 116, "bar": 15};
// keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
// console.log(keysSorted);

// TODO: take (top) number of food votes, then find hawker centres with these foods
// TODO: rank hawker centres by distance
