import Stall from "../models/stall.model";
import Sell from "../models/sell.model";
import { Json } from "sequelize/types/lib/utils";
import { any } from "bluebird";
import Food from "../models/food.model";
// import { Sequelize } from "sequelize/types";
const { Op, Sequelize } = require("sequelize");
//

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

export async function getHawkerCenterStallName(foodandvotesjson: {
  [key: string]: number;
}) {
  const stallidsjson = await getStallId(foodandvotesjson);
  if (stallidsjson) {
    const stallidobject = stallidsjson;
    const stallidarray = stallidobject.map(stallid => {
      const stallidentry = Object.values(stallid);
      return stallidentry;
    });
    try {
      const hawkers = await Stall.findAll({
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("hawkercenter")),
          "hawkercenter",
          "stallname"
        ],
        where: {
          stallId: { [Op.in]: stallidarray }
        },
        include: [
          {
            model: Food
          }
        ],
        raw: true
      });

      console.log(`hawkers recommendations retunred is ${hawkers}`);
      return hawkers;
      // // const hawkerobject = hawkers;
      // let result: { [key: string]: string[] } = {};
      // hawkers.forEach(object => {
      //   let key: string = Object.values(object)[0];
      //   result[key] = [];
      // });
      // hawkers.forEach(object => {
      //   let key: string = Object.values(object)[0];
      //   let value: string = Object.values(object)[1];
      //   result[key].push(value);
      // });
      // return JSON.stringify(result);
    } catch (err) {
      console.log(err);
    }
  }
}
