import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Food from "./food.model";
import Room from "./rooms.model";

@Table({
    tableName: "foodlisting",
    createdAt: false,
    updatedAt: false
})
class FoodListing extends Model<FoodListing> {
    @ForeignKey(() => Food)
    @Column
    foodName!: string;

    @ForeignKey(() => Room)
    @Column
    roomcode!: string;

    @Column
    foodPictureUrl!: string;
}

export default FoodListing;
