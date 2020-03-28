import path from "path";
import Rooms from "../models/rooms.model";

async function createRoom(): Promise<string | void> {
    let res_roomcode: string;

    try {
        const result = await Rooms.findOne({
            where: {
                roomstatus: "AVAIL"
            }
        });
        console.log(result);

        if (result) {
            res_roomcode = result.getDataValue("roomcode");
            console.log(`room code is ${res_roomcode}`);
            const number = await Rooms.update(
                { roomstatus: "ACTIVE" },
                {
                    where: {
                        roomcode: res_roomcode
                    }
                }
            );
            console.log(`Number of affected rows ${number}`);
            return res_roomcode;
        }
    } catch (err) {
        console.log("error is ", err);
    }
}

export default createRoom;
