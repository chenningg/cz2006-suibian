import path from "path";
import Rooms from "../models/rooms.model";
import Join from "../models/join.model";
import Vote from "../models/vote.model";
import shortid from "shortid";
import { sendError } from "../sockets/helper/messaging";
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

export const createRoomQuery = async (): Promise<void | string> => {
  try {
    const roomcode = shortid.generate();
    const room = await Rooms.create({
      roomcode,
      roomstatus: "open",
      numberparticipants: 0 //user automatically joins the room he creates
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
