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
      foodName: vote.foodName,
      like: vote.like
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
      group: "foodName"
    });
    return JSON.stringify(result);
  } catch (err) {
    console.log(err);
  }
};
