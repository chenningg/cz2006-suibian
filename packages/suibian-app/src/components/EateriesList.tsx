import React from "react";
import { Eatery, Food } from "@suibian/commons";

// CSS
import "../css/EateriesList.css";

type OwnProps = {
  topFoods: Food[];
  eateries: Eatery[];
  history: any;
};

// Functional component
const EateriesList = (props: OwnProps) => {
  const handleClick = e => {
    console.log(e.target.getAttribute("data-value"));
    props.history.push(`/eatery/${e.target.getAttribute("data-value")}`);
  };

  const eateriesList = props.eateries.map(eatery => {
    let topFoods: Food[] = []; // Replace with deep copy of passed in props array of top foods
    const foodExists: Food[] = [];

    const stallList = eatery.stalls.map(stall => {
      const foodList = stall.food.map(food => {
        // For each food, check if this food exists in top foods array, if yes, we remove it from foods to check and add it to food exists
        // This means that this eatery contains that top voted food
        topFoods.map((topFood, index) => {
          // If we found a match for a top food in this eatery...
          if (topFood.foodname === food.foodname) {
            foodExists.push(topFood);
            topFoods = topFoods.splice(index, 1);
            return;
          }
        });
      });
    });

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
        data-value={eatery.name}
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
