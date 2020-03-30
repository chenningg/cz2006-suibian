import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsToMany,
  PrimaryKey,
  Scopes
} from "sequelize-typescript";
import Room from "./room.model";
import Vote from "./vote.model";
import Join from "./join.model";
import Food from "./food.model";

@Scopes(() => ({
  rooms: {
    include: [
      {
        model: Room,
        through: { attributes: [] }
      }
    ]
  },
  foods: {
    include: [
      {
        model: Food,
        through: { attributes: [] }
      }
    ]
  }
}))
@Table({
  tableName: "user"
})
class User extends Model<User> {
  @PrimaryKey
  @Column
  username!: string;

  @Column
  userpreferences!: string;

  @ForeignKey(() => Room)
  @Column
  roomcode!: string;

  @BelongsToMany(
    () => Room,
    () => Join
  )
  rooms!: Room;

  @BelongsToMany(
    () => Food,
    () => Vote
  )
  foods!: Food;
}

export default User;
