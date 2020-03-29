import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import { db } from "../sequelize";
import { createRoomQuery, joinRoomQuery } from "./room";
const path = require("path");

const intializeDB = async () => {
    await db.sync();
};

const testCreateRoom = async () => {
    const roomcode = await createRoomQuery();
    return roomcode;
};

intializeDB()
    .then(testCreateRoom)
    .then(roomcode => {
        if (roomcode) {
            joinRoomQuery("alvin", roomcode);
        } else {
            console.log("no room code returned");
        }
    });
