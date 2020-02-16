import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Login() {
  return (
    <div className="main">
      <div>
        <br />
        <Link to="/register">Register</Link>
        <br />
      </div>
      <br></br>
      <div>
        <br />
        <Link to="/qrscan">QR</Link>
        <br />
      </div>
    </div>
  );
}
