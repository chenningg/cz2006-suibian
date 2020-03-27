import { db } from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from "sequelize";

class Hawker extends Model {
  public stall_id!: number;
  public images!: string;
  public hawker_centre!: string;
  public stall_name!: string;
  public stall_address!: string;
  public cuisine!: string;
  public opening!: string;
  public specialties!: string;
}

Hawker.init(
  {
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
  },
  {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    tableName: "hawkers"
  }
);
