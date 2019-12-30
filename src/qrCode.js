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
  render() {
    return (
      <div>
        <p id="scanCode"></p>
        <p>
          <button id="btnScanCode" onclick="scancode()">
            Scan Code
          </button>
        </p>
      </div>
    );
  }
}
