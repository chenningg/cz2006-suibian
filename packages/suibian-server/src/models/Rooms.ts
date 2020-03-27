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

class Room extends Model {
  public roomcode!: string;
  public roomstatus!: string;
  public numberparticipants!: number;
  public roomcreationtime!: string;
}

Room.init(
  {
    roomcode: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    roomstatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberparticipants: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomcreationtime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  },
  {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    tableName: "rooms"
  }
);

const data = {
  roomcode: "ABC",
  roomstatus: "VOTING",
  numberparticipants: 5,
  roomcreationtime: "13:45"
};

let { roomcode, roomstatus, numberparticipants, roomcreationtime } = data;

Room.create({
  roomcode,
  roomstatus,
  numberparticipants,
  roomcreationtime
});

export default Room;
