import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/register";
import QRscan from "./pages/qrscan";
import Main from "./pages/main";
import View from "./pages/view";

export default class route extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={Main} />
        <Route path="/Register" component={Register} />
        <Route path="/QRScan" component={QRscan} />
        <Route path="/View" component={View} />
      </Router>
    );
  }
}
