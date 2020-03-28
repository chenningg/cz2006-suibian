import Food from "../models/food.model";

export const foodImageQuery = async (
  queryLimit: number
): Promise<string | void> => {
  try {
    // returns Array<Food> in JSON
    const foodArray = await Food.findAll({
      order: "random()",
      limit: queryLimit
    });

    return JSON.stringify(foodArray);
  } catch (err) {
    console.log(err);
  }
};
