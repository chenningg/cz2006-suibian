import { Preference } from "./Preference";

export type User = {
  id?: string;
  username: string;
  isOwner: boolean;
  preferences?: Preference[];
};
