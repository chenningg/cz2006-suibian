import React from "react";
import { Result } from "@suibian/commons";
import { Favorite } from "@material-ui/icons";

// CSS
import "../css/TopFoodsList.css";

type NewFoodVote = {
  foodname: string;
  foodId: string;
  count: number;
};

type OwnProps = {
  result: Result;
};

// Functional component
const TopFoodsList = (props: OwnProps) => {
  const foodNames: NewFoodVote[] = [];
  const foodVotesCopy = [...props.result.foodVoteResults]; // Create deep copy

  // We want to check each stall to find the food names since we are only given the food id...
  breakLoop: for (
    let foodVoteIndex = foodVotesCopy.length - 1;
    foodVoteIndex >= 0;
    foodVoteIndex--
  ) {
    const foodVote = foodVotesCopy[foodVoteIndex];

    foundFood: for (let i = 0; i < props.result.eatery.length; i++) {
      const eatery = props.result.eatery[i];

      // For each stall
      for (let j = 0; j < eatery.stalls.length; j++) {
        const stall = eatery.stalls[j];

        // For each food
        for (let k = 0; k < stall.food.length; k++) {
          // Break if all food names found
          if (foodNames.length === props.result.foodVoteResults.length) {
            break breakLoop;
          }

          const food = stall.food[k];

          // Found a matching food, get the name
          if (food.foodId === foodVote.foodId) {
            foodNames.push({
              foodname: food.foodname,
              foodId: food.foodId,
              count: foodVotesCopy[foodVoteIndex].count,
            });
            break foundFood;
          }
        }
      }
    }
  }

  // Sort the new food votes array (With food names)
  foodNames.sort((a, b) => {
    return b.count - a.count;
  });

  const foodsList = foodNames.map((newFoodVote) => {
    return (
      <div
        className="food-votes-list-container flex-container flex-row flex-center-v flex-center-h flex-spaced-between"
        key={newFoodVote.foodId}
      >
        <h4 className="food-id">{newFoodVote.foodname}</h4>
        <p flex-container flex-row flex-center-h flex-center-v>
          {newFoodVote.count} <Favorite />
        </p>
      </div>
    );
  });

  return <div className="top-foods-list">{foodsList}</div>;
};

export default TopFoodsList;
