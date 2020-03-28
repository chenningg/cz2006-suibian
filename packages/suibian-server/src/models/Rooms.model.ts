import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    BelongsToMany,
    HasMany
} from "sequelize-typescript";

import User from "./user.model";

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

    @HasMany(() => User)
    users!: User[];
}

export default Rooms;
