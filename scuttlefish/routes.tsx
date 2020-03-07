import React from "react"
import { hot } from "react-hot-loader/root"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Landing from "./views/landing"

export default hot(() => (
  <Router>
    <Switch>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </Router>
))
