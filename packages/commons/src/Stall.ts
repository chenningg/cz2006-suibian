// A stall is a stall within an eatery.
import { Food } from "./Food";

export type Stall = {
  stallname: string;
  hawkercenter: string;
  address: string;
  food: Food[];
  imageurl: string;
  openinghours: number;
  closinghours: number;
  postalcode: number;
};
