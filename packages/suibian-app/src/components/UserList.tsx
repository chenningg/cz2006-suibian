//app components
import React from "react";

//css
import "../css/UserList.css";


type UserListProps = {
  users: User[];
};

// Display function to show a list of all users
const UserList = ({ users }: UserListProps) => {
  const userList = users.map(user => {
    return (
      <div
        className="user-list-row flex-container flex-row flex-center-h flex-center-v flex-spaced-between"
        key={user.id}
      >
        <p>{user.username}</p>
        <p className={user.isOwner ? "room-owner" : "hide"}>OWNER</p>
      </div>
    );
  });

  // Return our userList that has been mapped
  // Wrap it in a react fragment <> </> so that an array can be returned as react requires only returning one object
  // Make sure to put {} so it knows it is JSX, not plain html
  return <>{userList}</>;
};

export default UserList;
