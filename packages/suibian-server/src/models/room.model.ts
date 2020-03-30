import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsToMany,
  DataType,
  Scopes
} from "sequelize-typescript";

import User from "./user.model";
import Join from "./join.model";

@Scopes(() => ({
  users: {
    include: [
      {
        model: User,
        through: { attributes: [] }
      }
    ]
  }
}))
@Table({
  tableName: "room"
})
class Room extends Model<Room> {
  @PrimaryKey
  @Column
  roomcode!: string;

  @Column
  roomstatus!: string;

  @Column
  numberparticipants!: number;

  @Column(DataType.FLOAT)
  lat!: number;

  @Column(DataType.FLOAT)
  lng!: number;

  @BelongsToMany(
    () => User,
    () => Join
  )
  users!: User[];
}

export default Room;
