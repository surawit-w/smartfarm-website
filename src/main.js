import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Login() {
  return (
    <div className="Main">
      <header className="App-header">
        <div>
          <Link to="/register">Register</Link>
        </div>
        <br></br>
        <div>
          <Link to="/qrscan">QRScan</Link>
        </div>
      </header>
    </div>
  );
}
