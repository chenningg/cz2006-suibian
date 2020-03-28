import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./components/AppRouter";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./reducers/RootReducer";

// Create our data store for redux
const store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
