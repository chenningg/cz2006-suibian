import Food from "../models/food.model";
import shortid from "shortid";
import { sendError } from "../sockets/helper/messaging";

export const foodImageQuery = async (
  queryLimit: number
): Promise<string | void> => {
  try {
    // returns Array<Food> in JSON
    const foodArray = await Food.findAll({
      order: "random()",
      limit: queryLimit,
      raw: true // gives us dataValues
    });
    return foodArray;
  } catch (err) {
    console.log(err);
  }
};
