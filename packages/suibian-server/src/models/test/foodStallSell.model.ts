import { db } from "../config/sequelize";
import { DataTypes } from "sequelize";

//schema for food that stall sells
export const FoodStallSell = db.define("FoodStallSell", {
  FoodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  StallId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
});