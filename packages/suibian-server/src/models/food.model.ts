import { Table, Column, Model } from "sequelize-typescript";

@Table({
    tableName: "food",
    createdAt: false,
    updatedAt: false
})
class Food extends Model<Food> {
    @Column
    foodName!: string;

    @Column
    foodPictureUrl!: string;
}

export default Food;
