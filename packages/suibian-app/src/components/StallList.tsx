import React from "react";
import { Stall } from "@suibian/commons";

// CSS
import "../css/StallList.css";

type OwnProps = {
  stalls: Stall[];
};

const StallList = (props: OwnProps) => {
  const stallList = props.stalls.map(stall => {
    const foodList = stall.food.map(food => {
      return (
        <div
          key={food.foodname}
          className="food-container flex-container flex-col flex-center-v flex-center-h flex-end"
        >
          <p className="food-name">{food.foodname}</p>
          <div className="food-image-container">
            <img
              className="food-image"
              src={food.imageurl}
              alt="Delicious food."
            ></img>
          </div>
        </div>
      );
    });

    return (
      <div className="stall-container">
        <h3 className="stall-name">{stall.stallname}</h3>
        <div className="foods-container flex-container flex-row flex-wrap flex-start">
          {foodList}
        </div>
      </div>
    );
  });
  return (
    <div className="stalls-container flex-container flex-col flex-center-v">
      <h2 className="stalls-container-title">Stalls</h2>
      {stallList}
    </div>
  );
};

export default StallList;
