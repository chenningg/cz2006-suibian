import User from "../models/user.model";
import { joinRoomPayload } from "@suibian/commons";

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
