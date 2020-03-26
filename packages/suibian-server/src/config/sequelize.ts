import { Sequelize } from "sequelize";

//! placeholder db password info
// connection to db - create models etc.
export const db = new Sequelize("suibian", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
