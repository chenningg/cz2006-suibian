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

type votingStatus = "waiting" | "voting" | "completed";

@Table({
    tableName: "join",
    createdAt: false,
    updatedAt: false
})
class Join extends Model<Join> {
    @ForeignKey(() => User)
    @Column
    userId!: string;

    @ForeignKey(() => Rooms)
    @Column
    roomcode!: string;

    @Column
    votingStatus!: votingStatus;
}

export default Join;
