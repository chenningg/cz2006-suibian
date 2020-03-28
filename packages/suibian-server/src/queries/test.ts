import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import createRoom from "./rooms";
const path = require("path");
import { db } from "../sequelize";

const intializeDB = async () => {
    await db.sync();
};

const runTest2 = async () => {
    await createRoom().then(data => {
        console.log(`roomcode is ${data}`);
    });
};

intializeDB().then(runTest2);
