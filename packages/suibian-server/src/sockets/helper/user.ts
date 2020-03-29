import { joinRoomPayload } from "@suibian/commons";
import { createUserQuery } from "../../queries/user";

export const createUser = async (data: joinRoomPayload) => {
    await createUserQuery(data);
    console.log(`user: ${data.user.username} is created`);
};
