import React, { Component } from "react";
import { BrowserRouter as BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./App";
import QRscan from "./qrCode";
import Main from "./main";

export default class route extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={Main} />
        <Route path="/Register" component={Register} />
        <Route path="/QRScan" component={QRscan} />
      </BrowserRouter>
    );
  }
}
