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
    type: DataTypes.STRING(300),
    allowNull: false
  },
  hawker_centre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  stall_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  stall_address: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  cuisine: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  opening: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  specialties: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
});
