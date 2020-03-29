import Vote from "../models/vote.model";
import VoteType from "../../../commons/src/Vote";
import { isColString } from "sequelize/types/lib/utils";

//TODO: when front end sends votes over, then set user to finished voting

export const createVoteQueryPerUser = async (uservote: any) => {
  const { username, roomcode, votes } = uservote;
  // votes is an array of user vote type
  const votebulkentry = votes.map((vote: VoteType) => {
    // map calls the function once for every element in array
    // similar to foreach except it returns new array
    const voteentry = {
      username,
      roomcode,
      foodId: vote.foodId,
      like: vote.vote
    };
    return voteentry; // return for each element in the array
  });
  await Vote.bulkCreate(votebulkentry);
};

export const countVoteQuery = async (
  roomcode: string
): Promise<string | undefined> => {
  try {
    const result = await Vote.count({
      where: {
        roomcode,
        like: true
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
export function processVoteQuery(queryresult: string, top: number) {
  let result = JSON.parse(queryresult);
  let result_len = Object.keys(result).length;
  let top_len = Math.min(result_len, top);
  if (top_len > 0) {
    // array of sorted keys
    let sorted_keys = Object.keys(result).sort((a, b) => result[a] - result[b]);
    // type definition of vote results object
    let vote_results: { [key: string]: boolean } = {};
    for (let i = 0; i < top_len; i++) {
      vote_results[sorted_keys[i]] = result[sorted_keys[i]];
    }
    // returns Json of foodID: string and number of votes: number
    return JSON.stringify(vote_results);
  } else {
    console.log("No results found!");
  }
}
