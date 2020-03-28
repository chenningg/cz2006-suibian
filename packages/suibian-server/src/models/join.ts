import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    ForeignKey
} from "sequelize-typescript";
import Rooms from "./rooms.model";
import User from "./user.model";

@Table({
    tableName: "join",
    createdAt: false,
    updatedAt: false
})
class Join extends Model<Join> {
    @ForeignKey(() => User)
    @Column
    user!: number;

    @ForeignKey(() => Rooms)
    @Column
    roomcode!: string;

    @Column
    votingStatus!: string;
}

export default Join;
