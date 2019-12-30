import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./App";
import QRscan from "./qrCode";
import Main from "./main"

export default class route extends Component {
  render() {
      return (
          <Router>
              <Switch>
                  <Route exact path="/" component={Main}/>
                  <Route exact path="/Register" component={Register}/>
                  <Route exact path="/QRScan" component={QRscan}/>
              </Switch>
          </Router>
      );
  }
}
