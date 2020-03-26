import { db } from "../config/sequelize";
import { DataTypes } from "sequelize";

// hawker table schema definition
export const Hawker = db.define("Hawker", {
  stall_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hawker_centre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stall_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stall_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: true
  },
  opening: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specialties: {
    type: DataTypes.STRING,
    allowNull: true
  }
});
