import Food from "../models/food.model";
import { Sequelize } from "sequelize-typescript";

export const foodImageQuery = async (
    queryLimit: number
): Promise<string | void> => {
    try {
        // returns Array<Food> in JSON
        const foodArray = await Food.findAll({
            order: Sequelize.literal("random()"),
            limit: queryLimit,
            raw: true // return without metadata
        });

        return JSON.stringify(foodArray);
    } catch (err) {
        console.log(err);
    }
};
