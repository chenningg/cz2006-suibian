import path from "path";
import { Room } from "../models/Rooms.model";

async function createRoomQuery(): Promise<string> {
    let res_roomcode: string;
    const result = await Room.findOne({
        where: {
            roomstatus: "AVAIL"
        }
    });
    res_roomcode = result.dataValues.roomcode;
    const number = await Room.update(
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

export default createRoomQuery;
