import React from "react";
import PageBase from "./PageBase";
import Home from "./Home";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import UserPreferences from "./UserPreferences";
import SelectLocation from "./SelectLocation";
import RoomPageJoin from "./RoomPageJoin";
import RoomPageCreate from "./RoomPageCreate";
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
          <Route path="/selectlocation" component={SelectLocation}></Route>
          <Route path="/roompagejoin" component={RoomPageJoin}></Route>
          <Route path="/roompagecreate" component={RoomPageCreate}></Route>
        </div>
      </Switch>
    </Router>
  );
}

export default AppRouter;
