import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import { db } from "../sequelize";
import { createRoomQuery, joinRoomQuery } from "./room";
import { countVoteQuery, createVoteQueryPerUser } from "./vote";
import { any } from "bluebird";
const path = require("path");

const intializeDB = async () => {
    await db.sync({ force: true });
};

const testUploadVote = async () => {
    const votes = { "john": String, "0046": String, [{ "001": String, True: Boolean }, { "002": String, True: Boolean }]};
    await createVoteQueryPerUser(votes);
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
