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
    tableName: "stall",
    createdAt: false,
    updatedAt: false
})
class Stall extends Model<Stall> {
    @PrimaryKey
    @Column
    stallId!: number;

    @Column({
        type: DataType.TEXT
    })
    imageurl!: string;

    @Column
    hawkercenter!: string;

    @Column
    stallname!: string;

    @Column
    address!: string;

    @Column
    openinghours!: number;

    @Column
    closinghours!: number;

    @Column
    postalcode!: number;

    @BelongsToMany(
        () => Food,
        () => Sell
    )
    foods!: Food[];
}

export default Stall;
