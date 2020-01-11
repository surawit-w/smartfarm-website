import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./register";
import QRscan from "./qrscan";
import Main from "./main";

export default class route extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={Main} />
        <Route path="/Register" component={Register} />
        <Route path="/QRScan" component={QRscan} />
      </Router>
    );
  }
}
