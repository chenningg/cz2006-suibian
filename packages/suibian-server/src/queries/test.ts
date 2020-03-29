import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import { db } from "../sequelize";
import { createRoomQuery, joinRoomQuery } from "./room";
import { getStallId } from "../queries/stall";
const path = require("path");

const intializeDB = async () => {
    await db.sync();
};

const testCreateRoom = async () => {
  const roomcode = await createRoomQuery();
  return roomcode;
};

let data = {
  "1": 2,
  "2": 3
};

let datastring = JSON.stringify(data);

const testGetStallId = async () => {
  const sth = await getStallId(datastring);
  return sth;
};

intializeDB().then(testGetStallId);
//   .then(roomcode => {
//     if (roomcode) {
//       joinRoomQuery("alvin", roomcode);
//     } else {
//       console.log("no room code returned");
//     }
//   });
