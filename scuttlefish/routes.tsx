import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./views/landing";
import Thread from "./views/Thread";

export default hot(() => (
  <Router>
    <Switch>
      <Route path="/">
        <Landing />
      </Route>
      <Route path="/:key>" component={Thread} />
    </Switch>
  </Router>
));
