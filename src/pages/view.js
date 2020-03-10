import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import {
  Button,
  Header,
  Icon,
  Transition,
  Loader,
  Table,
  Divider,
  Segment,
  Dimmer
} from "semantic-ui-react";

const liff = window.liff;
const API = "https://line-smartfarm-api.herokuapp.com";
// const API = "http://localhost:4000";

export default class view extends Component {
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
      emptyTable: false,
      plant: [],
      farm: [],
      water: [],
      height: [],
      leaf: []
    };
    this.initialize = this.initialize.bind(this);
  }

  initialize() {
    // init liff with liffId from LINE dev.
    liff.init({ liffId: "1653759696-dlvPpnL2" }, async () => {
      console.log("Getting UID from LIFF");
      // check if user is logged in.
      if (liff.isLoggedIn()) {
        let profile = await liff.getProfile();
        this.setState({
          uid: profile.userId,
          line_pic: profile.pictureUrl
        });
        this.getData();
      }
      // if user is not login then using liff login function.
      else {
        liff.login();
      }
    });
  }

  componentDidMount() {
    document.title = "View";
    setTimeout(() => {
      // this.getData(); // only use this function when test (and disable initialize).
      this.initialize();
      this.setState({ loader: true });
    }, 500);
  }

  // this function use to get a data from smartfarm api
  async getData() {
    console.log("Getting a data from user...");
    // console.log("UID: " + this.state.uid);
    await axios
      .get(API + `/users/${this.state.uid}`)
      .then(res => {
        console.log(res.data.report);
        // if data is null then display a message
        if ((res.data.report == "") | (res.data.report == null)) {
          this.setState({
            emptyTable: true
          })
        } else {
          // this for loop will add a data to array in a state.
          for (let i = 0; i < res.data.report.length; i++) {
            this.setState({
              plant: this.state.plant.concat(res.data.report[i].plant),
              farm: this.state.farm.concat(res.data.report[i].farm),
              water: this.state.water.concat(res.data.report[i].water),
              height: this.state.height.concat(res.data.report[i].height),
              leaf: this.state.leaf.concat(res.data.report[i].leaf)
            });
          }
        }

        this.setState({ loader: false });
        setTimeout(() => {
          this.setState({ verify: true });
        }, 1500);
      })
      .catch(err => {
        // console.error(err);
        this.setState({
          registered: true
        });
        // delay before close liff
        setTimeout(() => {
          liff.closeWindow();
        }, 2000);
      });
  }

  // this function will show a view table in render function by calling it later.
  viewTable = () => {
    let table = [];

    // outer loop to create parent
    for (let i = 0; i < this.state.plant.length; i++) {
      let children = [];
      // inner loop to create children
      for (let j = 0; j < 1; j++) {
        children.push(
          <Table.Cell>{this.state.plant[i]}</Table.Cell>,
          <Table.Cell>{this.state.farm[i]}</Table.Cell>,
          <Table.Cell>{this.state.water[i]}</Table.Cell>,
          <Table.Cell>{`${this.state.height[i]} ซม.`}</Table.Cell>,
          <Table.Cell>{`${this.state.leaf[i]} ใบ`}</Table.Cell>
        );
      }

      // create the parent and add the children
      table.push(
        <Segment>
          <Header as="h2" floated="left" className="prompt">
            ตารางผล
          </Header>

          <Divider clearing />

          <Table unstackable celled basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>พืช</Table.HeaderCell>
                <Table.HeaderCell>ฟาร์ม</Table.HeaderCell>
                <Table.HeaderCell>รดน้ำ</Table.HeaderCell>
                <Table.HeaderCell>สูง</Table.HeaderCell>
                <Table.HeaderCell>ใบ</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>{children}</Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      );
    }
    return table;
  };

  render() {
    return (
      <div>
        <div>
          {this.state.verify ? (
            // view table
            <div id="" className="main report-table">
              <Transition
                visible={this.state.verify}
                animation="fade up"
                duration={1000}
              >
                <div id="report-table">
                  <Header as="h1" icon className="prompt">
                    <Icon name="file alternate outline" />
                    ตรวจสอบผล
                    <Header.Subheader className="subheader">
                      {this.state.emptyTable
                        ? "ไม่พบข้อมูลที่ต้องการ กรุณาลองใหม่ภายหลังค่ะ"
                        : "ตรวจสอบผลตามตารางด้านล่างค่ะ"}
                    </Header.Subheader>
                  </Header>

                  {this.viewTable()}
                </div>
              </Transition>
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
                  <div>
                    <Dimmer
                      active={this.state.registered}
                      onClickOutside={this.handleClose}
                      page
                    >
                      <Header as="h2" icon inverted className="prompt">
                        <Icon name="times" />
                        ไม่พบไอดีผู้ใช้งาน
                        <Header.Subheader className="subheader">
                          โปรดลงทะเบียนก่อนเข้าใช้งานค่ะ
                          <span role="img" aria-label="please">
                            {" "}
                            😓
                          </span>
                        </Header.Subheader>
                      </Header>
                    </Dimmer>
                  </div>
                </div>
              </Transition>
            </div>
          )}
        </div>
      </div>
    );
  }
}
