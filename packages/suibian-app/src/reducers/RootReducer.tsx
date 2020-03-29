import ReduxState from "../types/ReduxState";

// Initial state of our Redux store
const initState = {
  users: [],
  userPreferences: [
    { type: "Halal", prefID: "0", value: false },
    { type: "Vegetarian", prefID: "1", value: false },
    { type: "Vegan", prefID: "2", value: false },
    { type: "Buddhist", prefID: "3", value: false }
  ],
  socketState: {
    endpoint: "http://localhost:4000/",
    socket: null,
    username: "",
    roomCode: 0
  }
};

// The one main reducer that can have sub reducers to translate actions > update the store
const RootReducer = (state: ReduxState = initState, action: any) => {
  switch (action.type) {
    case "UPDATE_USER_PREFERENCES":
      let newUserPreferences = state.userPreferences.map(preference => {
        return preference.type === action.preferenceType
          ? {
              type: preference.type,
              prefID: preference.prefID,
              value: !preference.value
            }
          : preference;
      });
      return { ...state, userPreferences: newUserPreferences };

    case "UPDATE_SOCKET_STATE":
      let newSocketState = { ...state.socketState };
      newSocketState[action.key] = action.value;
      return { ...state, socketState: newSocketState };

    case "UPDATE_USERS":
      let newUsers = [...action.users];
      return { ...state, users: newUsers };
  }

  return state;
};

export default RootReducer;
