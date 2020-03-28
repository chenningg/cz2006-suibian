import Vote from "../models/vote.model";

export const createVote = async (username: string, roomcode: string) => {
  await Vote.create({
    username,
    roomcode,
    finishedvote: false
  });
};
