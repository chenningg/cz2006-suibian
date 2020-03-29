import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Rooms from "./rooms.model";
import User from "./user.model";

type votingStatus = "waiting" | "voting" | "completed";

@Table({
    tableName: "join"
})
class Join extends Model<Join> {
    @ForeignKey(() => User)
    @Column
    username!: string;

    @ForeignKey(() => Rooms)
    @Column
    roomcode!: string;

    @Column
    votingStatus!: votingStatus;
}

export default Join;
