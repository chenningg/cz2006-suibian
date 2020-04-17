import Vote from "../models/vote.model";
import { Vote as VoteType, FoodVote } from "@suibian/commons";
import { isColString } from "sequelize/types/lib/utils";
import { Sequelize } from "sequelize-typescript";
import Food from "../models/food.model";

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
      vote: vote.like,
    };
    return voteentry; // return for each element in the array
  });
  await Vote.bulkCreate(votebulkentry, {
    ignoreDuplicates: true,
  });
  console.log("Votes passed to database");
  return votebulkentry;
};

export const countVoteQuery = async (
  roomcode: string
): Promise<FoodVote[] | undefined> => {
  try {
    const result = await Vote.findAll({
      attributes: [
        "foodId",
        [Sequelize.fn("count", Sequelize.col("foodId")), "count"],
      ],
      where: {
        roomcode,
        vote: true,
      },
      group: "foodId",
      raw: true,
    });

    const resultTypeCasted: FoodVote[] = [];
    result.forEach((vote: Vote) => {
      //@ts-ignore
      resultTypeCasted.push({ foodId: vote.foodId, count: vote.count });
    });

    return resultTypeCasted;
  } catch (err) {
    console.log(err);
  }
};

// export const countVoteQuery = async (
//   roomcode: string
// ): Promise<{ [key: string]: number } | void> => {
//   try {
//     const result = await Vote.count({
//       where: {
//         roomcode,
//         vote: true
//       },
//       group: "foodId"
//     });
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };

// TODO: take (top) number of food votes, then find hawker centres with these foods
// TODO: rank hawker centres by distance
