import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey
} from "sequelize-typescript";

@Table({
    tableName: "rooms",
    createdAt: false,
    updatedAt: false
})
class Rooms extends Model<Rooms> {
    @PrimaryKey
    @Column
    roomcode!: string;

    @Column
    roomstatus!: string;

    @Column
    numberparticipants!: number;

    @Column
    roomcreationtime!: string;
}

export default Rooms;
