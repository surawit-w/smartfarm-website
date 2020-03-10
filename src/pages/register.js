import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import {
  Button,
  Header,
  Form,
  Icon,
  Transition,
  Loader,
  Dimmer
} from "semantic-ui-react";

const liff = window.liff;
const API = "https://line-smartfarm-api.herokuapp.com";
// const API = "http://localhost:4000";

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
      loader: false,
      verify: false,
      registered: false,
      duplicated: false
    };
    this.initialize = this.initialize.bind(this);
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

  componentDidMount() {
    document.title = "Register";
    setTimeout(() => {
      // this.verify(); //use this function if testing.
      this.initialize();
      this.setState({ loader: true });
    }, 500);
  }

  // check for duplicated UID
  verify() {
    console.log("Checking for duplicated...");
    console.log("UID: " + this.state.uid);
    axios
      .post(API + "/verify", {
        uid: this.state.uid
      })
      .then(res => {
        // console.log(res);
        console.log("New UID Detected!");
        this.setState({ loader: false });
        setTimeout(() => {
          this.setState({ verify: true });
        }, 1500);
      })
      .catch(err => {
        // console.log(err);
        console.log("Duplicated UID Detected!");
        liff.closeWindow();
      });
  }

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

        this.setState({ registered: true });

        // delay before close liff
        setTimeout(() => {
          liff.closeWindow();
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        console.log("Register Failed!");
        this.setState({
          loading: true,
          registered: true,
          duplicated: true
        });
        setTimeout(() => {
          this.setState({
            loading: false,
            registered: false,
            duplicated: false
          });
        }, 2500);
      });
  };

  // use to check form change
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.verify ? (
            // register form
            <div id="register-form" className="main">
              <Transition
                visible={this.state.verify}
                animation="fade up"
                duration={1000}
              >
                <Form onSubmit={this.register}>
                  <Header as="h1" icon className="prompt">
                    <Icon name="pencil alternate" />
                    ลงทะเบียนผู้ใช้ใหม่
                    <Header.Subheader className="subheader">
                      {this.state.loading
                        ? "กรุณารอสักครู่ กำลังประมวลผลค่ะ"
                        : "โปรดกรอกข้อมูลก่อนเริ่มใช้งานด้วยค่ะ"}
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
              <div>
                <Dimmer
                  active={this.state.registered}
                  onClickOutside={this.handleClose}
                  page
                >
                  <Header as="h2" icon inverted className="prompt">
                    <Icon name={this.state.duplicated ? "times" : "check"} />
                    {this.state.duplicated
                      ? "ลงทะเบียนล้มเหลว!"
                      : "ลงทะเบียนสำเร็จ!"}
                    <Header.Subheader className="subheader">
                      {this.state.duplicated
                        ? "โปรดลองใหม่อีกครั้งค่ะ"
                        : "กำลังออกจากหน้าต่างลงทะเบียนค่ะ"}
                      <span role="img" aria-label="please">
                        {" "}
                        🚀
                      </span>
                    </Header.Subheader>
                  </Header>
                </Dimmer>
              </div>
            </div>
          ) : (
            // Loader when entering register pages.
            <div id="loader" className="main">
              <Transition
                visible={this.state.loader}
                animation="fade up"
                duration={1000}
              >
                <div>
                  <Loader size="massive" active indeterminate inverted>
                    <Header as="h2" className="prompt">
                      <br />
                      กำลังโหลด...
                      <Header.Subheader className="subheader">
                        กรุณารอสักครู่ค่ะ
                        <span role="img" aria-label="please">
                          {" "}
                          🥺
                        </span>
                      </Header.Subheader>
                    </Header>
                  </Loader>
                </div>
              </Transition>
            </div>
          )}
        </div>
      </div>
    );
  }
}
