import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./components/AppRouter";
import * as dotenv from "dotenv-extended";

// Redux
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./reducers/RootReducer";
import ReduxState from "./types/ReduxState";

//load env status
dotenv.load();

let store: Store<ReduxState, any>;
// Create our data store for redux
if (process.env.NODE_ENV === "development") {
  store = createStore(
    RootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(RootReducer);
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
