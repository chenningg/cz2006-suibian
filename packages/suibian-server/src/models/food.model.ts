import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsToMany,
  DataType
} from "sequelize-typescript";
import Stall from "./stall.model";
import Sell from "./sell.model";

@Table({
  tableName: "food",
  createdAt: false,
  updatedAt: false
})
class Food extends Model<Food> {
  @PrimaryKey
  @Column
  foodId!: string;

  @Column
  foodname!: string;

  @Column({
    type: DataType.TEXT
  })
  imageurl!: string;

  @BelongsToMany(
    () => Stall,
    () => Sell
  )
  stalls!: Stall[];
}

export default Food;
