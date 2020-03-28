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

class User extends Model {
  public username!: string;
  public userpreferences!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    userpreferences: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    tableName: "users"
  }
);

export default User;
