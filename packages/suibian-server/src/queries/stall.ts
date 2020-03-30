import Stall from "../models/stall.model";
import Sell from "../models/sell.model";
import { Json } from "sequelize/types/lib/utils";
import { any } from "bluebird";
import Food from "../models/food.model";
import { FoodVote, Eatery } from "@suibian/commons";
// import { Sequelize } from "sequelize/types";
const { Op, Sequelize } = require("sequelize");
//@ts-nocheck

export async function getStallId(foodandvotes: {
  [key: string]: number;
}): Promise<Sell[] | undefined> {
  let foodidarray = Object.keys(foodandvotes);
  console.log(foodidarray);
  try {
    const stallidobject = await Sell.findAll({
      attributes: ["stallId"],
      where: {
        foodId: { [Op.in]: foodidarray }
      },
      raw: true
    });
    // contains sell entries that contain food people want
    return stallidobject;
  } catch (err) {
    console.log(err);
  }
}

export async function getPostalCode(hawkercenter: string) {
  try {
    const data = await Stall.findOne({
      attributes: ["postalcode"],
      where: {
        hawkercenter
      },
      raw: true
    });
    return data?.postalcode;
  } catch (err) {
    console.log(err);
  }
}

const processStall = (stall: Stall) => {
  let hawkercenterName = stall.hawkercenter;
  //@ts-ignore
  let foodArray = [];

  //@ts-ignore
  stall["dataValues"]["foods"].forEach((foodData: any) => {
    let foodObj: { [key: string]: string } = {
      foodId: foodData["dataValues"]["foodId"],
      imageurl: foodData["dataValues"]["imageurl"],
      foodname: foodData["dataValues"]["foodname"]
    };
    foodArray.push(foodObj);
  });

  let stallObject = {
    //@ts-ignore
    stallname: stall["dataValues"]["stallname"],
    //@ts-ignore
    imageurl: stall["dataValues"]["imageurl"],
    //@ts-ignore
    openinghours: stall["dataValues"]["openinghours"],
    //@ts-ignore
    closinghours: stall["dataValues"]["closinghours"],
    //@ts-ignore
    food: foodArray
  };

  return stallObject;
};

const createEatery = (stallList: Stall[]) => {
  let eateryDict = new Map<string, Eatery>();
  stallList.forEach(stall => {
    //@ts-ignore
    let hawkercenterName = stall["dataValues"]["hawkercenter"];
    //@ts-ignore
    if (!eateryDict.has(stall["dataValues"])) {
      //@ts-ignore
      let location = stall["dataValues"]["postalcode"];
      let eateryEntry = {
        name: hawkercenterName,
        location: location,
        stalls: []
      };

      eateryDict.set(hawkercenterName, eateryEntry);
    }
  });

  return eateryDict;
};

export async function getHawkerCenterStallName(foodVotes: FoodVote[]) {
  try {
    const foodIdArray = foodVotes.map(foodVote => foodVote.foodId);
    const hawkers = await Stall.findAll({
      where: {
        "$foods.foodId$": { [Op.in]: foodIdArray }
      },
      include: [
        {
          model: Food
        }
      ]
    });

    let eateryDict = createEatery(hawkers);
    hawkers.forEach((hawkerEntry: Stall) => {
      let stallProcessed = processStall(hawkerEntry);

      //@ts-ignore
      let hakername = hawkerEntry["dataValues"]["hawkercenter"];
      //find the right hawker to insert in
      //@ts-ignore
      eateryDict.get(hakername)["stalls"].push(stallProcessed);
    });

    let result: Eatery[] = [];
    eateryDict.forEach(function(val, key) {
      result.push(val);
    });

    return result;
  } catch (err) {
    console.log(err);
  }
}
