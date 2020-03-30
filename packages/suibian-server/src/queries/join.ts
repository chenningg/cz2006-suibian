import Join from "../models/join.model";
import { VotingStatus } from "@suibian/commons";

export const updateUserQuery = async (
  roomcode: string,
  username: string,
  data: any
): Promise<void> => {
  try {
    await Join.update<Join>(data, {
      where: {
        roomcode,
        username
      }
    });
  } catch (err) {
    console.log(`error message :${err}`);
  }
};

export const joinRoomQuery = async (username: string, roomcode: string) => {
  try {
    await Join.create({
      username,
      roomcode,
      votingstatus: VotingStatus.waiting
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRoomJoinQuery = async (
  roomCode: string
): Promise<Join[] | void> => {
  try {
    const joinResult = await Join.findAll({
      where: {
        roomcode: roomCode
      }
    });
    return joinResult;
  } catch (err) {
    console.log(`error is ${err}`);
  }
};
