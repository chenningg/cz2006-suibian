import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Stall from "./stall.model";
import Food from "./food.model";

@Table({
    tableName: "vote",
    createdAt: false,
    updatedAt: false
})
class Sell extends Model<Sell> {
    @ForeignKey(() => Stall)
    @Column
    stallId!: number;

    @ForeignKey(() => Food)
    @Column
    foodId!: number;
}

export default Sell;
