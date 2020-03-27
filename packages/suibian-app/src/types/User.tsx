interface User {
  id: string;
  username: string;
  isOwner: boolean;
  preferences?: Preference[];
}

export default User;
