import Food from "../models/food.model";
import shortid from "shortid";
import { sendError } from "../sockets/helper/messaging";

export const foodImageQuery = async (
  queryLimit: number
): Promise<string | void> => {
  try {
    const image_urls = await Food.findAll({
      order: "random()",
      limit: queryLimit
    });
  } catch (err) {
    console.log(err);
  }
};
