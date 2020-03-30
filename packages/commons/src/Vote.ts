export type Vote = {
  foodId: string;
  like: boolean;
};

export enum VotingStatus {
  waiting = "waiting",
  voting = "voting",
  completed = "completed"
}
export type FoodVote = {
  foodId: string;
  count: number;
};
