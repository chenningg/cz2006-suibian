import ReduxState from "../types/ReduxState";

// Initial state of our Redux store
const initState: ReduxState = {
  users: [],
  user: {
    username: "",
    isOwner: false,
    preferences: [
      { type: "Halal", prefID: "0", value: false },
      { type: "Vegetarian", prefID: "1", value: false },
      { type: "Vegan", prefID: "2", value: false },
      { type: "Buddhist", prefID: "3", value: false }
    ]
  },
  socketState: {
    endpoint: "http://localhost:4000/",
    socket: null,
    roomCode: ""
  },
  votes: [],
  foods: [],
  position: { latitude: 0, longitude: 0 },
  recommendations: []
};

// The one main reducer that can have sub reducers to translate actions > update the store
const RootReducer = (state: ReduxState = initState, action: any) => {
  switch (action.type) {
    case "UPDATE_USER_PREFERENCES":
      let newUserPreferences = state.user.preferences.map(preference => {
        return preference.type === action.preferenceType
          ? {
              type: preference.type,
              prefID: preference.prefID,
              value: !preference.value
            }
          : preference;
      });
      return {
        ...state,
        user: { ...state.user, preferences: newUserPreferences }
      };

    case "UPDATE_SOCKET_STATE":
      let newSocketState = { ...state.socketState };
      newSocketState[action.key] = action.value;
      return { ...state, socketState: newSocketState };

    case "UPDATE_USER":
      let newUser = { ...state.user };
      newUser[action.key] = action.value;
      return { ...state, user: newUser };

    case "UPDATE_USERS":
      let newUsers = [...action.users];
      return { ...state, users: newUsers };

    case "UPDATE_FOODS":
      let newFoods = [...action.foods];
      return { ...state, foods: newFoods };

    case "SUBMIT_VOTES":
      let newVotes = { ...action.votes };
      return { ...state, votes: newVotes };

    case "UPDATE_POSITION":
      let newPosition = { ...action.position };
      return { ...state, position: newPosition };

    case "UPDATE_RECOMMENDATIONS":
      let newRecommendations = { ...action.recommendations };
      return { ...state, recommendations: newRecommendations };
  }

  return state;
};

export default RootReducer;
