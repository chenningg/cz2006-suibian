import Sequelize from "sequelize";

//! placeholder db password info
export const sequelize = new Sequelize();

module.exports = new Sequelize("hawkers", "postgres", "Marysheep@97", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
