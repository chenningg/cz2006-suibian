import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import Rooms from "./rooms.model";

@Table({
  tableName: "user",
  createdAt: false,
  updatedAt: false
})
class User extends Model<User> {
  @Column
  username!: string;

  @Column
  userpreferences!: string;

  @ForeignKey(() => Rooms)
  @Column
  roomcode!: string;

  @BelongsTo(() => Rooms)
  rooms!: Rooms;
}

export default User;
