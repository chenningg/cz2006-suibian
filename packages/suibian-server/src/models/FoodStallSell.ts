import { db } from "../config/sequelize";
import { DataTypes } from "sequelize";

//Room food that store sells schema
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