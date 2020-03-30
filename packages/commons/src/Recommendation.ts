import { FoodVote } from "./Vote";
import { Eatery } from "./Eatery";

export type Recommendation = {
  foodVoteResults: FoodVote[];
  eatery: Eatery;
};
