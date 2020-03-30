// An eatery is a location containing stalls
import { Position } from "./Position";
import { Stall } from "./Stall";

export type Eatery = {
  name: string;
  location: string;
  stalls: Stall[];
};
