import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    ForeignKey
} from "sequelize-typescript";
import User from "./user.model";
import Rooms from "./rooms.model";

@Table({
    tableName: "vote",
    createdAt: false,
    updatedAt: false
})
class Votes extends Model<Votes> {
    @ForeignKey(() => User)
    @Column
    user!: number;

    @ForeignKey(() => Rooms)
    @Column
    roomcode!: string;

    @Column
    username!: string;

    @Column
    vote!: boolean;
}

export default Votes;
