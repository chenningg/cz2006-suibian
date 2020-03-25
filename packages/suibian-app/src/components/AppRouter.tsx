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
        <Route exact path="/" component={Home}></Route>
        <Route path="/createroom" component={CreateRoom}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/joinroom" component={JoinRoom}></Route>
        <Route path="/userpreferences" component={UserPreferences}></Route>
        <Route path="/selectlocation" component={SelectLocation}></Route>
        <Route path="/roompagejoin" component={RoomPageJoin}></Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
