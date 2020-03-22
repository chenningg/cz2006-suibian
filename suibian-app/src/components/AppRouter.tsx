import React from "react";
import PageBase from "./PageBase";
import Home from "./Home";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import UserPreferences from "./UserPreferences";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../css/AppRouter.css";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <div className="app-router">
          <Route path="/" exact component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/pagebase" component={PageBase}></Route>
          <Route path="/createroom" component={CreateRoom}></Route>
          <Route path="/joinroom" component={JoinRoom}></Route>
          <Route path="/userpreferences" component={UserPreferences}></Route>
        </div>
      </Switch>
    </Router>
  );
}

export default AppRouter;
