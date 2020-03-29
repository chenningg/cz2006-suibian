import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany,
    PrimaryKey
} from "sequelize-typescript";
import Food from "./food.model";
import Sell from "./sell.model";

@Table({
    tableName: "foodstalls",
    createdAt: false,
    updatedAt: false
})
class Stall extends Model<Stall> {
    @PrimaryKey
    @Column
    stallId!: number;

    @Column
    imageurl!: string;

    @Column
    hawkercenter!: string;

    @Column
    stallname!: string;

    @Column
    address!: string;

    @Column({
        type: DataType.TIME
    })
    openinghours!: number;

    @Column({
        type: DataType.TIME
    })
    closinghour!: number;

    @Column
    postalcode!: number;

    @BelongsToMany(
        () => Food,
        () => Sell
    )
    foods!: Food[];
}

export default Stall;
