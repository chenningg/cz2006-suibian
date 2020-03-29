import Vote from "../models/vote.model";
import { isColString } from "sequelize/types/lib/utils";

//TODO: when front end sends votes over, then set user to finished voting

export const createVoteQuery = async (
  username: string,
  roomcode: string,
  foodName: string,
  vote: boolean
): Promise<void> => {
  try {
    await Vote.create({
      username,
      roomcode,
      foodName,
      vote // true or false representing whether they like the food
    });
  } catch (err) {
    console.log(err);
  }
};

export const createVoteBulkQuery = async();

export const checkVoteQuery = async (
  username: string,
  roomcode: string
): Promise<string | void> => {
  try {
    let finishedvote = await Vote.findOne({
      where: {
        username,
        roomcode
      }
    });
    return JSON.stringify(finishedvote);
  } catch (err) {
    console.log(err);
  }
};
