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

    @HasMany(() => User)
    users!: User[];
}

export default Rooms;
