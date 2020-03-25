import React from "react";
import Home from "./Home";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import UserPreferences from "./UserPreferences";
import SelectLocation from "./SelectLocation";
import RoomPageJoin from "./RoomPageJoin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../css/Global.css";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/createroom">
          <CreateRoom />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/joinroom">
          <JoinRoom />
        </Route>
        <Route path="/userpreferences">
          <UserPreferences />
        </Route>
        <Route path="/selectlocation">
          <SelectLocation />
        </Route>
        <Route path="/roompagejoin">
          <RoomPageJoin />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
