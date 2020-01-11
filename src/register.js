import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const liff = window.liff;
const API = "https://line-smartfarm-api.herokuapp.com"

export default class register extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      line_id: "",
      line_pic: "",
      name: "",
      tel: "",
      loading: false,
      user_info_arr: []
    };
    this.initialize = this.initialize.bind(this);
  }

  // init state (use to get liff data)
  initialize() {
    console.log("Entering initialize state...");
    liff.init({ liffId: "1610155283-WqRpOKwB" }, async () => {
      let profile = await liff.getProfile();
      this.setState({
        line_id: profile.userId,
        line_pic: profile.pictureUrl
      });
      console.log("Get UID completed going to register page...");
      this.verifyUID();
    });
  }

  componentDidMount() {
    window.addEventListener("load", this.initialize);
    document.title = "Register";
  }

  // use to check form change
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // post a form data to DB
  userPost = e => {
    console.log("Connecting to an API...")
    e.preventDefault();
    this.setState({ loading: true });
    axios.post(API + "/users", this.state).then(Response => {
      console.log("Register Success!");

      // delay before close
      setTimeout(() => {
        this.setState({ loading: false });
        liff.closeWindow();
      }, 2000);
    });
  };

  render() {
    const { line_id, loading, line_pic, name, tel } = this.state;
    return (
      <div className="App font">
        <h1>ลงทะเบียนผู้ใช้ใหม่</h1>
        <div>
          <img width="40%" src={line_pic}></img>
        </div>
        {/* <input className="line-id" value={line_id} name={line_id} disabled /> */}
        <p className="form-label">ชื่อเกษตรกร</p>
        <input
          required
          className="farmer-name"
          placeholder="กรอกชื่อที่นี่"
          type="text"
          name="name"
          value={name}
          onChange={this.changeHandler}
        />
        <p className="form-label">เบอร์โทรศัพท์</p>
        <input
          required
          className="farmer-phone"
          placeholder="กรอกเบอร์โทรศัพท์ที่นี่"
          maxLength="10"
          type="tel"
          name="tel"
          value={tel}
          onChange={this.changeHandler}
        />
        <br></br>
        <button
          className="button"
          type="submit"
          id="submitBtn"
          onClick={this.userPost}
        >
          ลงทะเบียน
        </button>
      </div>
    );
  }
}
