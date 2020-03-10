import React, { Component } from "react";

const liff = window.liff;

export default class qrCode extends Component {

  initialize() {
    // init liff with liffId from LINE dev.
    liff.init({ liffId: "1653759696-JeYDkn12" }, async () => {
      console.log("Getting UID from LIFF");
      // check if user is logged in.
      if (liff.isLoggedIn()) {
        await liff.scanCode()
      }
      // if user is not login then using liff login function.
      else {
        liff.login();
      }
    });
  }

  scanCode() {
    liff.scanCode().then(result => {
      const stringifiedResult = JSON.stringify(result);
      alert(stringifiedResult);
      document.getElementById("scanCode").textContent = stringifiedResult;
      liff.init({ liffId: "1653759696-JeYDkn12" }, () => {
        liff.scanCode()
      });
    });
  }

  componentDidMount() {
    document.title = "QRScan";
    this.initialize();
  }

  render() {
    return (
      <div>
        <p id="scanCode"></p>
      </div>
    );
  }
}
