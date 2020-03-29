import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: "food",
    createdAt: false,
    updatedAt: false
})
class Food extends Model<Food> {
    @PrimaryKey
    @Column
    foodID!: string;

    @Column
    foodName!: string;

    @Column
    foodPictureUrl!: string;
}

export default Food;
