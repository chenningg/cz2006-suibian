import Vote from "../models/vote.model";
import { isColString } from "sequelize/types/lib/utils";

export const createVoteQuery = async (
  username: string,
  roomcode: string
): Promise<void> => {
  try {
    await Vote.create({
      username,
      roomcode,
      finishedvote: false
    });
  } catch (err) {
    console.log(err);
  }
};

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
