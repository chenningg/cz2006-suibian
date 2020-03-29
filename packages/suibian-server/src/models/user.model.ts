import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsToMany,
    PrimaryKey
} from "sequelize-typescript";
import Rooms from "./rooms.model";
import Vote from "./vote.model";
import Join from "./join.model";
import Food from "./food.model";

@Table({
    tableName: "user"
})
class User extends Model<User> {
    @PrimaryKey
    @Column
    username!: string;

    @Column
    userpreferences!: string;

    @BelongsToMany(
        () => Rooms,
        () => Join
    )
    rooms!: Rooms;

    @BelongsToMany(
        () => Food,
        () => Vote
    )
    foods!: Food;
}

export default User;
