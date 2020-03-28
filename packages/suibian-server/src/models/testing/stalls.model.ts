import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull
} from "sequelize-typescript";

@Table({
    tableName: "foodstalls",
    createdAt: false,
    updatedAt: false
})
class Stalls extends Model<Stalls> {
    @Column
    imageUrl!: string;

    @Column
    address!: string;

    @Column({
        type: DataType.TIME
    })
    opentime!: number;

    @Column({
        type: DataType.TIME
    })
    closetime!: number;

    @AllowNull
    @Column
    rating!: number;
}

export default Stalls;
