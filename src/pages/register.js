import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Button, Header, Form, Icon, Transition } from "semantic-ui-react";

const liff = window.liff;
const API = "https://line-smartfarm-api.herokuapp.com";

export default class register extends Component {
  // I should try redux...
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      line_pic: "",
      name: "",
      tel: "",
      loading: false,
      visible: false
    };
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    // this.initialize();
    document.title = "Register";
  }

  initialize() {
    // init liff with liffId from LINE dev.
    liff.init({ liffId: "1653759696-vxLMYoW8" }, async () => {
      console.log("Getting UID from LIFF");
      // check if user is logged in.
      if (liff.isLoggedIn()) {
        let profile = await liff.getProfile();
        this.setState({
          uid: profile.userId,
          line_pic: profile.pictureUrl
        });
        this.verify();
      }
      // if user is not login then using liff login function.
      else {
        liff.login();
      }
    });
  }

  // check for duplicated UID
  verify() {
    console.log("Checking for duplicated...");
    this.setState({ loading: true });
    axios
      .post(API + "/verify", {
        uid: this.state.uid
      })
      .then(res => {
        // console.log(res);
        console.log("New UID Detected!");
        this.setState({ visible: true,loading: false })
      }).catch(err => {
        // console.log(err);
        console.log("Duplicated UID Detected!");
        liff.closeWindow();
      })
  };

  // post a form data to DB
  register = e => {
    console.log("Registering...");
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post(API + "/users", {
        uid: this.state.uid,
        name: this.state.name,
        tel: this.state.tel
      })
      .then(res => {
        console.log(res);
        console.log("Register Success!");

        // delay before close liff
        setTimeout(() => {
          liff.closeWindow();
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        console.log("Register Failed!");
        this.setState({ loading: false });
      });
  };

  // use to check form change
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div id="loader" className="main">
          
        </div>
        <div id="register-form" className="main">
          <Transition
            visible={this.state.visible}
            animation="scale"
            duration={1000}
          >
            <Form onSubmit={this.register}>
              <Header as="h1" icon className="prompt">
                <Icon name="pencil alternate" />
                ลงทะเบียนผู้ใช้ใหม่
                <Header.Subheader className="subheader">
                  {this.state.loading
                    ? "กรุณารอสักครู่ กำลังประมวลผลค่ะ" : "โปรดกรอกข้อมูลก่อนเริ่มใช้งานด้วยค่ะ"}
                </Header.Subheader>
              </Header>
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
          </Transition>
        </div>
      </div>
    );
  }
}
