import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Landing from "./views/landing"

export default () => (
  <Router>
    <Switch>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </Router>
)
