import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Button, Header, Form } from "semantic-ui-react";

const liff = window.liff;
const API = "https://line-smartfarm-api.herokuapp.com";

export default class register extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      line_id: "",
      line_pic: "",
      name: "",
      tel: "",
      loading: false
    };
    this.initialize = this.initialize.bind(this);
  }

  // init state (use to get liff data)
  initialize() {
    // init liff with liffId from LINE Dev
    liff.init({ liffId: "1653759696-vxLMYoW8" }, async () => {
      console.log("Checking for UID...");
      // check if user is already loggedIn
      if (liff.isLoggedIn()) {
        let profile = await liff.getProfile();
        this.setState({
          line_id: profile.userId,
          line_pic: profile.pictureUrl
        });
        console.clear();
        console.log("User is already logged in.");
      }
      // if user is not login then using liff login function
      else {
        liff.login();
      }
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
  register = e => {
    console.log("Registering...");
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post(API + "/users", {
        line_id: this.state.line_id,
        name: this.state.name,
        tel: this.state.tel
      })
      .then(res => {
        console.log(res);
        console.log("Register Success!");

        // delay before close
        setTimeout(() => {
          this.setState({ loading: false });
          liff.closeWindow();
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        console.log("Register Failed!");
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <div className="main">
          <Header as="h1" className="prompt">
            ลงทะเบียนผู้ใช้ใหม่
          </Header>
          <Form onSubmit={this.register}>
            <Form.Field required>
              <label className="form-label">ชื่อเกษตรกร</label>
              <input
                required
                className="form-input"
                placeholder="กรอกชื่อที่นี่"
                type="text"
                name="name"
                value={this.state.name}
                disabled={this.state.loading}
                onChange={this.changeHandler}
              />
            </Form.Field>
            <Form.Field required>
              <label className="form-label">เบอร์โทรศัพท์</label>
              <input
                required
                className="form-input"
                placeholder="กรอกเบอร์โทรศัพท์ที่นี่"
                maxLength="10"
                type="tel"
                name="tel"
                value={this.state.tel}
                disabled={this.state.loading}
                onChange={this.changeHandler}
              />
            </Form.Field>
            <Button
              color="orange"
              content="ลงทะเบียน"
              className="form-btn"
              type="submit"
              disabled={this.state.loading}
              loading={this.state.loading}
            />
          </Form>
        </div>
        {this.state.line_id}
      </div>
    );
  }
}
