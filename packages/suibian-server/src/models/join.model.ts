import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Room from "./room.model";
import User from "./user.model";

type votingStatus = "waiting" | "voting" | "completed";

@Table({
  tableName: "join"
})
class Join extends Model<Join> {
  @ForeignKey(() => User)
  @Column
  username!: string;

  @ForeignKey(() => Room)
  @Column
  roomcode!: string;

  @Column
  votingStatus!: votingStatus;
}

export default Join;
