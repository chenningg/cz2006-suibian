import path from "path";
import Room from "../models/Rooms";

async function createRoomQuery(): Promise<string> {
    let res_roomcode: string;
    const result = await Room.findOne({
        where: {
            roomstatus: "AVAIL"
        }
    });
    res_roomcode = result.dataValues.roomcode;
    await Room.update(
        { roomstatus: "ACTIVE" },
        {
            where: {
                roomcode: res_roomcode
            }
        }
    );
    return res_roomcode;
}

export default createRoomQuery;
