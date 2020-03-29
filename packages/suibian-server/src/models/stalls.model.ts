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
}

export default Stalls;
