import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App.js";
import qrcode from "./qrCode.js";

export default class MainRoute extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route patch="/" component={App} />
          <Route patch="/qrcode" component={qrcode} />
        </Switch>
      </Router>
    );
  }
}
