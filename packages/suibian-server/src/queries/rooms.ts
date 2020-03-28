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

        if (result) {
            res_roomcode = result.getDataValue("roomcode");
            const number = await Rooms.update(
                { roomstatus: "ACTIVE" },
                {
                    where: {
                        roomcode: res_roomcode
                    }
                }
            );
            return res_roomcode;
        }
    } catch (err) {
        console.log("error is ", err);
    }
}

export default createRoom;
