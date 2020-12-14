
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
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
  Col,
  CardTitle,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";
import fire from "../config/Fire";

class Userdata extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1",
    divDetails: [],
    data: {
      labels: ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"],
      datasets: [
        {
          label: "PH",
          data: [],
          fill: true,
          
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
      labels: ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"],
      datasets: [
        {
          label: "Turbidity",
          data: [],
          fill: true,
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
              suggestedMax: 1
            }
          }
        ]
      }
    },
    data_fr: {
      labels: ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"],
      datasets: [
        {
          label: "Flow Rate",
          data: [],
          fill: true,
          
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    },
    options_fr: {
      title: {
        display: true,
        text: "FLow Rate"
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
    data_tds: {
      labels: ["4:00", "4:10", "4:20", "4:30", "4:40", "4:50"],
      datasets: [
        {
          label: "TDS",
          data: [],
          fill: true,
          
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    },
    options_tds: {
      title: {
        display: true,
        text: "TDS Chart"
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
  };
  componentDidMount() {
    //Receiving data from props at Tables.jsx
    var x = this.props.location.state.nodeId;
    console.log(this.props.location.state, x);
    //Fetching data from firestore from document id as device id of user
    const db = fire.firestore()
    window.setInterval(() => {
      db.collection("nodes").doc(`${x}`).get().then(snapshot => {
        const users = [];
        //console.log(snapshot.data().readings.slice(-1)[0]);
        let readings = snapshot.data().readings.slice(-1)[0];
        let readingsList = snapshot.data().readings.slice(-6,);
        this.setState({ divDetails: readings, dataset: readingsList })
        this.dataList();
      })
        .catch(err => console.log(err));
    }, 2000);

  }
  dataList = () => {
    var copy = this.state.data
    var copy_turb = this.state.data_turb
    var copy_fr = this.state.data_fr
    var copy_tds = this.state.data_tds
    copy.datasets[0].data = [];
    copy_turb.datasets[0].data = [];
    copy_fr.datasets[0].data = [];
    copy_tds.datasets[0].data = [];
    if (this.state.dataset) {
      this.state.dataset.forEach(doc => {
        copy.datasets[0].data.push(doc.ph)
        copy_turb.datasets[0].data.push(doc.turb)
        copy_fr.datasets[0].data.push(doc.FR)
        copy_tds.datasets[0].data.push(doc.TDS)
      })
      this.setState({ data: copy, data_turb: copy_turb, data_fr: copy_fr, data_tds: copy_tds })
    }
  }
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

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        {/* <Header /> */}

        {/* Page content */}
        <Container className="pt-10" fluid>

          {this.state.divDetails ?
            <>
              <Row style={{ background: '#00bfff', display: 'block', padding: "10px" }}>
                <Card className="card-stats mb-2" style={{ marginTop: '100px' }}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {this.state.divDetails.firstName}
                          User message
                          </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {this.state.divDetails.ph < 8 ? "ph is good and Water is safe for drinking" : "ph is acidic and water may have some contamination"}
                        </span><br />
                        <span className="h2 font-weight-bold mb-0">
                          {this.state.divDetails.turb < 1 ? "turbidity is good and Water is safe for drinking" : "Turbidity is more and water may have some contamination"}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa fa-envelope-open " />
                        </div>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
              </Row>
              <Row style={{ background: '#00bfff' }}>

                <Col className="" style={{ marginTop: '10px' }}>

                  <Col  >
                    <Card className="card-stats mb-2" style={{ margin: '0px -13px 0px -15px' }}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              {this.state.divDetails.firstName}
                          User
                          </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {this.props.location.state.firstName}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fa fa-user-circle" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">User ID &nbsp; </span>
                          <span className="text-success mr-2">
                            {this.props.location.state.nodeId}
                          </span>{" "}

                        </p>
                      </CardBody>
                    </Card>
                  </Col>

                  <Row>
                    <Col >
                      <Card className="card-stats mb-2">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Temparature
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {/* {div.leakes} */}
                                {this.state.divDetails.cel}
                              </span>
                            </div>

                          </Row>
                          {/*<p className="mt-3 mb-0 text-muted text-sm">

                            <span className="text-nowrap">Since last year</span>
                          </p> */}
                        </CardBody>
                      </Card>
                    </Col>
                    <Col >
                      <Card className="card-stats mb-2">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Bill
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {/* {div.bill} */}
                                {this.props.location.state.bill ? this.props.location.state.monthBill : "--"}
                              </span>
                            </div>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>


                  <Row>
                    <Col >
                      <Card className="card-stats mb-2">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                PH Value
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.state.divDetails.ph}
                              </span>
                            </div>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                    <Col >
                      <Card className="card-stats mb-2">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Turbidity
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.state.divDetails.turb}
                              </span>
                            </div>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col >
                      <Card className="card-stats mb-2">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Flow Rate
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.state.divDetails.FR}
                              </span>
                            </div>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                    <Col >
                      <Card className="card-stats mb-2">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Water Usage
                          </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {this.state.divDetails.WU}
                              </span>
                            </div>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col className="mb-6 " xl="7" style={{ marginTop: '10px' }}>
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
                      <div className="chart" style={{ height: '290px', }}>
                        <Line
                          data={chartExample1[this.state.chartExample1Data]}
                          options={chartExample1.options}
                          getDatasetAtEvent={e => console.log(e)}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>

              </Row>
              <Row style={{ background: '#00bfff', padding: "10px" }}>
                <Card style={{ width: "48%", marginRight: "15px" }}>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart" style={{ height: '290px', }}>
                      <Line
                        data={this.state.data}
                        options={this.state.options}
                      />
                    </div>
                  </CardBody>
                </Card>
                <Card style={{ width: "48%", marginLeft: "20px" }}>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart" style={{ height: '290px', }}>
                      <Line
                        data={this.state.data_turb}
                        options={this.state.options_turb}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Row>
              <Row style={{ background: '#00bfff', padding: "10px" }}>
                <Card style={{ width: "48%", marginRight: "15px" }}>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart" style={{ height: '290px', }}>
                      <Line
                        data={this.state.data_fr}
                        options={this.state.options_fr}
                      />
                    </div>
                  </CardBody>
                </Card>
                <Card style={{ width: "48%", marginLeft: "20px" }}>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart" style={{ height: '290px', }}>
                      <Line
                        data={this.state.data_tds}
                        options={this.state.options_tds}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </>
            : <div></div>
          }

        </Container>
      </>
    );
  }
}

export default Userdata;
