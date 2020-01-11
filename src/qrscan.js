import React, { Component } from "react";

const liff = window.liff;

export default class qrCode extends Component {
  initialize() {
    function scanCode() {
      liff.scanCode().then(result => {
        const stringifiedResult = JSON.stringify(result);
        alert(stringifiedResult);
        document.getElementById("scanCode").textContent = stringifiedResult;
      });
    }
    liff.init({ liffId: "1610155283-WqRpOKwB" }, () => {});
  }

  componentDidMount() {
    document.title = "QRScan";
  }

  render() {
    return (
      <div>
        <p id="scanCode"></p>
        <p>
          <button id="btnScanCode" onclick="scanCode()">
            Scan Code
          </button>
        </p>
      </div>
    );
  }
}
