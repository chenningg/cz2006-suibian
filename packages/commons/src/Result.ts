import { FoodVote } from "./Vote";
import { Eatery } from "./Eatery";

export type Result = {
  foodVoteResults: FoodVote[];
  eatery: Eatery[];
};
