interface User {
  userID: string;
  username: string;
  isOwner: boolean;
  preferences: Preference[];
}

export default User;
