import {
    Table,
    Column,
    Model,
    ForeignKey,
    PrimaryKey
} from "sequelize-typescript";
import Stall from "./stall.model";
import Food from "./food.model";

@Table({
    tableName: "sell",
    createdAt: false,
    updatedAt: false
})
class Sell extends Model<Sell> {
    @PrimaryKey
    @Column
    sellId!: number;

    @ForeignKey(() => Stall)
    @Column
    stallId!: number;

    @ForeignKey(() => Food)
    @Column
    foodId!: number;
}

export default Sell;
