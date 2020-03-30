import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { VotingStatus } from "@suibian/commons";
import Room from "./room.model";
import User from "./user.model";

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
  votingstatus!: VotingStatus;
}

export default Join;
