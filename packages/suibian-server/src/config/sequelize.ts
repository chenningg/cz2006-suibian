import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";

//! placeholder db password info
// connection to db - create models etc.
const databaseName = process.env.DATABASENAME || "suibian";
const databaseUsername = process.env.DATABASEUSERNAME || "";
const databasePassword = process.env.DATABASEPASSWORD || "";
const DATABASEURL = process.env.DATABASEURL;

export const db = new Sequelize(
    databaseName,
    databaseUsername,
    databasePassword,
    {
        host: DATABASEURL,
        dialect: "postgres",

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
