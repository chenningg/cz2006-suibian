import {
    Table,
    Column,
    Model,
    PrimaryKey,
    BelongsToMany
} from "sequelize-typescript";

import User from "./user.model";
import Join from "./join.model";

@Table({
    tableName: "rooms"
})
class Rooms extends Model<Rooms> {
    @PrimaryKey
    @Column
    roomcode!: string;

    @Column
    roomstatus!: string;

    @Column
    numberparticipants!: number;

    @BelongsToMany(
        () => User,
        () => Join
    )
    users!: User[];
}

export default Rooms;
