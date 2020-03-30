import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Room from "./room.model";
import Food from "./food.model";

@Table({
  tableName: "vote"
})
class Votes extends Model<Votes> {
  @ForeignKey(() => User)
  @Column
  username!: string;

  @ForeignKey(() => Room)
  @Column
  roomcode!: string;

  @ForeignKey(() => Food)
  @Column
  foodId!: string;

  @Column
  vote!: boolean;
}

export default Votes;
