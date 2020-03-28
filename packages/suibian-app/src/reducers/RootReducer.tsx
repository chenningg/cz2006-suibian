// Initial state of our Redux store
const initState = {
  roomID: "TEST",
  users: [
    { id: "0", username: "Robin", isOwner: true },
    { id: "1", username: "Amy", isOwner: false },
    { id: "2", username: "Hathaway", isOwner: false },
    { id: "3", username: "Benny", isOwner: false }
  ]
};

// The one main reducer that can have sub reducers to translate actions > update the store
const RootReducer = (state: ReduxState = initState, action: any) => {
  return state;
};

export default RootReducer;
