import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import { db } from "../sequelize";
import { createRoomQuery, joinRoomQuery } from "./room";
import {
  getHawkerCenterStallName,
  getPostalCode,
  getTravelToHawker
} from "../queries/stall";
import { getLatLonSocketless } from "../queries/onemap";
const path = require("path");

const intializeDB = async () => {
  await db.sync();
};

// const testUploadVote = async () => {
//     const votes = { "john": String, "0046": String, [{ "001": String, True: Boolean }, { "002": String, True: Boolean }]};
//     await createVoteQueryPerUser(votes);
// };

const testGetPostalCode = async () => {
  const sth = await getPostalCode("North Bridge Road Market & Food Centre");
  return sth;
};

const test1 = JSON.stringify({
  "Golden Mile Food Centre": [
    "Kee's Crispy Goreng Pisang",
    "Tong Ji Mian Shi (桐记面食)"
  ],
  "North Bridge Road Market & Food Centre": [
    "Ke Shuang Xing Fried Carrot Cake (North Bridge Road Market & Food Centre)"
  ]
});

const test2 = JSON.stringify({ lat: 1.3521, lon: 103.8198 });

const testTravelToHawker = async () => {
  const sth = await getTravelToHawker(test1, test2);
  console.log("travel times", sth);
  return sth;
};

intializeDB().then(testTravelToHawker);
// .then(testGetStallName)
//   .then(roomcode => {
//     if (roomcode) {
//       joinRoomQuery("alvin", roomcode);
//     } else {
//       console.log("no room code returned");
//     }
//   });
