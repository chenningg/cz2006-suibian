import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Rooms from "./rooms.model";
import Food from "./food.model";

@Table({
  tableName: "vote",
  createdAt: false,
  updatedAt: false
})
class Votes extends Model<Votes> {
  @ForeignKey(() => User)
  @Column
  username!: string;

  @ForeignKey(() => Rooms)
  @Column
  roomcode!: string;

  @ForeignKey(() => Food)
  @Column
  foodName!: string;

  @Column
  vote!: boolean;
}

export default Votes;
