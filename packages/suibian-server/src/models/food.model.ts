import {
    Table,
    Column,
    Model,
    PrimaryKey,
    BelongsToMany
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
    foodId!: number;

    @Column
    foodname!: string;

    @Column
    imageurl!: string;

    @BelongsToMany(
        () => Stall,
        () => Sell
    )
    stalls!: Stall[];
}

export default Food;
