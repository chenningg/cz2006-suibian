import path from "path";
import Room from "../models/Rooms";

//* Create room doesn't create new entry, it is an UPDATE (room code is assigned)
async function createRoomQuery() {
  let res_roomcode: string;
  await Room.findOne({
    where: {
      roomstatus: "AVAIL"
    }
  })
    .then(async (result: any) => {
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
    })
    .catch((err: any) => console.log(err));
}

export default createRoomQuery;
