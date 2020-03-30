import Rooms from "../models/room.model";
import Join from "../models/join.model";
import Vote from "../models/vote.model";
import { Position } from "@suibian/commons";

function makeid(length: number) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const createRoomQuery = async (
  position: Position
): Promise<void | string> => {
  try {
    const roomcode = makeid(4);
    const { latitude, longitude } = position;
    const room = await Rooms.create({
      roomcode,
      roomstatus: "open",
      numberparticipants: 0, //user automatically joins the room he creates
      lat: latitude,
      lng: longitude
    });
    return roomcode;
  } catch (err) {
    console.log(err);
  }
};

export const joinRoomQuery = async (username: string, roomcode: string) => {
  try {
    await Join.create({
      username,
      roomcode,
      votingStatus: "waiting"
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRoomQuery = async (roomcode: string, body: any) => {
  try {
    await Rooms.update<Rooms>(body, {
      where: {
        roomcode
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRoomNumbersQuery = async (
  roomcode: string,
  change: number
) => {
  try {
    await Rooms.increment(
      { numberparticipants: change },
      {
        where: {
          roomcode
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const closeRoomQuery = async (roomcode: string) => {
  try {
    await Join.destroy({
      where: {
        roomcode: roomcode
      }
    });
    await Rooms.destroy({
      where: {
        roomcode: roomcode
      }
    });
    await Vote.destroy({
      where: {
        roomcode: roomcode
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRoomDetailsQuery = async (roomcode: string) => {};
