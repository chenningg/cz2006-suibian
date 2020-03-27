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

//* Create room doesn't create new entry, it is an UPDATE (room code is assigned)

// const data = {
//   roomcode: "ABC",
//   roomstatus: "VOTING",
//   numberparticipants: 5,
//   roomcreationtime: "13:45"
// };

// let { roomcode, roomstatus, numberparticipants, roomcreationtime } = data;

// Room.create({
//   roomcode,
//   roomstatus,
//   numberparticipants,
//   roomcreationtime
// });

// function getAvailableRoom() {
//   return Room.findOne({
//     where: {
//       roomstatus: "AVAILABLE"
//     }
//   });
// }

// function createRoom() {
//   getAvailableRoom()
//     .then((result: any) => {
//       console.log(result);
//     })
//     .catch((error: any) => console.log(error));
// }

// createRoom();

async function createRoom() {
  let res_roomcode: string;
  Room.findOne({
    where: {
      roomstatus: "AVAIL"
    }
  })
    .then((result: any) => {
      res_roomcode = result.dataValues.roomcode;
      Room.update(
        { roomstatus: "ACTIVE" },
        {
          where: {
            roomcode: res_roomcode
          }
        }
      );
      return res_roomcode;
    })
    .catch((err: any) => console.log(err));
}

createRoom();

export default Room;
