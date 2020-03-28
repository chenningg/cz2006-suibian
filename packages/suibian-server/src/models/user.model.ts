import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import Rooms from "./rooms.model";
import { col } from "sequelize/types";
import { Room } from "socket.io";

@Table({
    tableName: "user",
    createdAt: false,
    updatedAt: false
})
class User extends Model<User> {
    @PrimaryKey
    @Column
    username!: string;

    @Column
    userpreferences!: string;

    @ForeignKey(() => Rooms)
    @Column
    roomcode!: string;

    @BelongsTo(() => Rooms)
    rooms!: Rooms;
}

export default User;
