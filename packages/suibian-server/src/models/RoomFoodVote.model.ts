import { db } from "../config/sequelize";
import { DataTypes } from "sequelize";

//Room food voting schema
export const RoomFoodVote = db.define("RoomFoodVote", {
  FoodListingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  vote: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});