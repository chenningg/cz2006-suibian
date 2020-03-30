import { joinRoomPayload } from "@suibian/commons";
import Join from "../models/join.model";
export const updateUser = async (
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
