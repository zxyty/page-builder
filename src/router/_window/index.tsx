import React from "react";
import { Router, Route, Switch } from "dva/router";

import "./index.less";

import HomePage from "../home";

export function AppIndexRouter(props: any) {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}
