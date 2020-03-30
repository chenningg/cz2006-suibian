import User from "../models/user.model";
import { joinRoomPayload } from "@suibian/commons";
import Join from "../models/join.model";

export const createUserQuery = async (
  data: joinRoomPayload
): Promise<void | string> => {
  try {
    const { roomCode } = data;
    const { username, isOwner, preferences } = data.user;
    const user = await User.create({
      username,
      userpreferences: "null",
      roomcode: roomCode
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserJoin = async (
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
