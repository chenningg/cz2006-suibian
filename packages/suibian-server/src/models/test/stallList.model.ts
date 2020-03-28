import { db } from "../config/sequelize";
import { DataTypes } from "sequelize";

//Room Stall List schema
export const StallList = db.define("StallList", {
  StallId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false
  },

  opentime: {
    type: DataTypes.TIME,
    allowNull: false
  },

  closetime: {
    type: DataTypes.TIME,
    allowNull: false
  },

  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});