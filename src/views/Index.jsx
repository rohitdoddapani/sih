import React, { useState } from "react";
// node.js library that concatenates classes (strings)
//import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import classnames from "classnames";
// react plugin used to create charts
import { Line, Bar, HorizontalBar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import fire from "../config/Fire";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1",
    data: {
      labels: ["User1", "User2"],
      datasets: [
        {
          label: "PH",
          data: [],
          fill: true,
          backgroundColor: "#3287a8",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "PH Chart"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        ]
      }
    },
    data_turb: {
      labels: ["User1", "User2"],
      datasets: [
        {
          label: "Turbidity",
          data: [1,2,3,2,1,1],
          fill: true,
          backgroundColor: "#3287a8",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    },
    options_turb: {
      title: {
        display: true,
        text: "Turbidity Chart"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        ]
      }
    }
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentDidMount() {
    const db = fire.firestore()
    //window.setInterval(() => {
      db.collection("nodes").doc('u1').get().then(snapshot => {
        const users = [];
        //console.log(snapshot.data().readings.slice(-1)[0]);
        let readings = snapshot.data().readings.slice(-1)[0];
        let readingsList = snapshot.data().readings.slice(-1,);
        console.log(readingsList);
        this.setState({ dataset: readingsList })
        this.dataList();
      })
        .catch(err => console.log(err));
    // }, 2000);
  }
  dataList = () => {
    var copy = this.state.data
    var copy_turb = this.state.data_turb
    copy.datasets[0].data = [];
    copy_turb.datasets[0].data = [];
    if (this.state.dataset) {
      this.state.dataset.forEach(doc => {
        copy.datasets[0].data.push(doc.ph)
        copy_turb.datasets[0].data.push(doc.turb)
        copy.datasets[0].data.push(doc.ph)
        copy_turb.datasets[0].data.push(doc.turb)
      })
      this.setState({ data: copy, data_turb: copy_turb })
    }
  }
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row style={{ padding: "10px" }}>
            <div className="col-md-4">
            <Card style={{ backgroundColor: "#18214d" }}>
              <CardBody>
                {/* Chart */}
                <div className="chart" style={{ height: '290px', }}>
                  <HorizontalBar
                    data={this.state.data}
                    options={this.state.options}
                  />
                </div>
              </CardBody>
            </Card>
            </div>
            <div className="col-md-4">
            <Card style={{ backgroundColor: "#18214d" }}>
              <CardBody>
                {/* Chart */}
                <div className="chart" style={{ height: '290px', }}>
                  <HorizontalBar
                    data={this.state.data_turb}
                    options={this.state.options_turb}
                  />
                </div>
              </CardBody>
            </Card>
            </div>
            <div className="col-md-4">
            <Card style={{ backgroundColor: "#18214d" }}>
              <CardBody>
                {/* Chart */}
                <div className="chart" style={{ height: '290px', }}>
                  <HorizontalBar
                    data={this.state.data_turb}
                    options={this.state.options_turb}
                  />
                </div>
              </CardBody>
            </Card>
            </div>
          </Row>
          <Row>

            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Water Usage</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                  {/* <MapB /> */}

                </CardBody>
              </Card>
            </Col>
            {/* <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Households</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart }
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          {/* <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Dams & Valley's </h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Area</th>
                      <th scope="col">Probability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Ramganga Dam</th>
                      <td>4,569</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Srinagar Dam</th>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tehri Dam</th>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Koteswara Dam</th>
                      <td>2,050</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Dhauligana Dam</th>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Dharma Valley</th>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Bhilangana valley</th>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Valley of Flowers</th>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Bhagiradha valley red zone</th>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
                          </Col> */}
          {/* <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>  
          </Row>*/}
        </Container>
      </>
    );
  }
}

export default Index;
