import React from "react";
import { Result, FoodVote, Food } from "@suibian/commons";

// CSS
import "../css/EateriesList.css";

type OwnProps = {
  result: Result;
  history: any;
};

// Functional component
const EateriesList = (props: OwnProps) => {
  const handleClick = e => {
    console.log(e.target.getAttribute("data-value"));
    props.history.push(`/eatery/${e.target.getAttribute("data-value")}`);
  };

  const eateriesList = props.result.eatery.map((eatery, index) => {
    let topFoods: FoodVote[] = [...props.result.foodVoteResults]; // Replace with deep copy of passed in props array of top foods
    const foodExists: Food[] = [];

    // Loop through every stall in every eatery, set a label to break
    eateryLoop: for (
      let stallIndex = 0;
      stallIndex < eatery.stalls.length;
      stallIndex++
    ) {
      const stall = eatery.stalls[stallIndex];

      // Loop through every food in that stall
      for (let foodIndex = 0; foodIndex < stall.food.length; foodIndex++) {
        const food = stall.food[foodIndex];

        // Found all top foods, stop
        if (topFoods.length <= 0) {
          break eateryLoop;
        }

        // For each food, check if this food exists in top foods array, if yes, we remove it from foods to check and add it to food exists
        // This means that this eatery contains that top voted food
        for (
          let topFoodIndex = topFoods.length - 1;
          topFoodIndex >= 0;
          topFoodIndex--
        ) {
          const topFood = topFoods[topFoodIndex];

          // If we found a match for a top food in this eatery, this eatery has this food, and no need to check for this top food anymore
          if (topFood.foodId === food.foodId) {
            foodExists.push(food);
            topFoods = topFoods.splice(foodIndex, 1);
            break;
          }
        }
      }
    }

    let foodExistsString = "";

    if (foodExists.length > 0) {
      foodExists.map((foodItem, index) => {
        if (index === foodExists.length - 1) {
          // Last element, don't put comma
          foodExistsString += `${foodItem.foodname}`;
        } else {
          foodExistsString += `${foodItem.foodname}, `;
        }
      });
    }

    // Return an eatery and the top food it has here
    return (
      <div
        className="eatery-container flex-container flex-col"
        key={eatery.name}
        data-value={index}
        onClick={handleClick}
      >
        <h4 className="eatery-name">{eatery.name}</h4>
        <p>{foodExistsString}</p>
      </div>
    );
  });

  return <div className="eateries-list">{eateriesList}</div>;
};

export default EateriesList;
