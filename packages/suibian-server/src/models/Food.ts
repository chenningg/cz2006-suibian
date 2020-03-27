import { db } from "../config/sequelize";
import { DataTypes } from "sequelize";

//Room food schema
export const Food = db.define("Food", {
  FoodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  FoodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  foodPicture: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});