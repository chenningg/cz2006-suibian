import React, { Component } from "react";
import User from "../types/User";

export type UserListProperty = {
  users: User[];
};

// Display function to show a list of all users
const UserList = ({ users }: UserListProperty) => {
  const userList = users.map(user => {
    return user.age > 1 ? (
      <div className="user-list" key={user.id}>
        <p>
          <b>Name: {user.name}</b>
          <br></br>
          Age: {user.age}, Gender: {user.gender}
        </p>
        <button
          // Anonymous function so it doesn't call the function, but only when clicked.
          onClick={() => {
            deleteUser(user.id);
          }}
        >
          Delete
        </button>
        <hr></hr>
      </div>
    ) : null;
  });

  // Return our userList that has been mapped
  // Wrap it in a react fragment <> </> so that an array can be returned as react requires only returning one object
  // Make sure to put {} so it knows it is JSX, not plain html
  return <>{userList}</>;
};
