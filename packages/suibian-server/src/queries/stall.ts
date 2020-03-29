import Stall from "../models/stall.model";
import Sell from "../models/sell.model";
import { Json } from "sequelize/types/lib/utils";
import { any } from "bluebird";
// import { Sequelize } from "sequelize/types";
const { Op, Sequelize } = require("sequelize");
//

export async function getStallId(
  foodandvotesjson: string
): Promise<string | undefined> {
  let foodidarray = Object.keys(JSON.parse(foodandvotesjson));
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
    return JSON.stringify(stallidobject);
  } catch (err) {
    console.log(err);
  }
}

// getStallId(datastring);

export async function getHawkerCenter(foodandvotesjson: string) {
  const stallidsjson = await getStallId(foodandvotesjson);
  if (stallidsjson) {
    const stallidobject = JSON.parse(stallidsjson);
    const stallidarray = stallidobject.map((stallid: any) => {
      const stallidentry = Object.values(stallid);
      return stallidentry;
    });
    try {
      const hawkers = await Stall.findAll({
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("hawkercenter")),
          "hawkercenter"
        ],
        where: {
          stallId: { [Op.in]: stallidarray }
        },
        raw: true
      });

      const hawkerobject = hawkers;
      const hawkerarray = hawkerobject.map((hawker: any) => {
        const hawkercenter = Object.values(hawker)[0];
        return hawkercenter;
      });
      return JSON.stringify(hawkerarray);
    } catch (err) {
      console.log(err);
    }
  }
}

export async function getStallName(foodandvotesjson: string) {
  const stallidsjson = await getStallId(foodandvotesjson);
  if (stallidsjson) {
    const stallidobject = JSON.parse(stallidsjson);
    const stallidarray = stallidobject.map((stallid: any) => {
      const stallidentry = Object.values(stallid);
      return stallidentry;
    });
    try {
      const stalls = await Stall.findAll({
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("stallname")),
          "stallname"
        ],
        where: {
          stallId: { [Op.in]: stallidarray }
        },
        raw: true
      });
      const stallobject = stalls;
      const stallobjectarray = stallobject.map((stall: any) => {
        const stallname = Object.values(stall)[0];
        return stallname;
      });
      return JSON.stringify(stallobjectarray);
    } catch (err) {
      console.log(err);
    }
  }
}
