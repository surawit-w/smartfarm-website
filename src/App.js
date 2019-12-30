import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { async } from "q";
import { GET, POST } from "./service";

const liff = window.liff;

function SignIn(props) {
  const { classes } = props;

  // const [name] = useState("");
  // const [tel] = useState("");
  // const [id] = useState("");
}

export default class App extends Component {
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

  componentDidMount() {
    window.addEventListener("load", this.initialize);
    document.title = "Register";
  }

  handleChange = async ({ target: { value, name } }) => {
    await this.setState(
      {
        [name]: value
      },
      await console.log(this.state)
    );
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendInfo = async () => {
    let name = this.state.name;
    let tel = this.state.tel;
    let lineId = this.state.line_id;
    let test = await POST("/sendInfo", { name, tel, lineId });
    console.log(test);
    alert(test.status);
  };

  render() {
    const { line_id, loading, line_pic, name, tel } = this.state;
    return (
      <div class="App font">
        <h1>ลงทะเบียนเกษตรกรใหม่</h1>
        <div>
          <img width="40%" src={line_pic}></img>
        </div>
        <input
          class="line-id"
          value={"Line ID: " + line_id}
          name={"Line ID: " + line_id}
          disabled
        />

        <p>ชื่อเกษตรกร</p>
        <input
          required
          class="farmer-name"
          placeholder="ชื่อ-นามสกุล"
          type="text"
          name="name"
          value={name}
          onChange={this.changeHandler}
        />
        <p>เบอร์โทรศัพท์</p>
        <input
          required
          class="farmer-phone"
          placeholder="กรอกเบอร์โทรศัพท์ที่นี่ค่ะ"
          maxLength="10"
          type="tel"
          name="tel"
          value={tel}
          onChange={this.changeHandler}
        />
        <button
          class="button"
          type="submit"
          id="submitBtn"
          onClick={this.sendInfo}
        >
          ลงทะเบียน
        </button>
      </div>
    );
  }
}
