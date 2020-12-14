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

import fire from '../../config/Fire';

import Header from "components/Headers/Header.jsx";

class Charts extends React.Component {
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
    },
    data_tds: {
        labels: ["User1", "User2"],
        datasets: [
          {
            label: "TDS",
            data: [1,2,3,2,1,1],
            fill: true,
            backgroundColor: "#3287a8",
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
      data_fr: {
        labels: ["User1", "User2"],
        datasets: [
          {
            label: "Flow Rate",
            data: [1,2,3,2,1,1],
            fill: true,
            backgroundColor: "#3287a8",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      },
      options_fr: {
        title: {
          display: true,
          text: "Flow Rate"
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
    var copy_tds = this.state.data_tds
    var copy_fr = this.state.data_fr
    copy.datasets[0].data = [];
    copy_turb.datasets[0].data = [];
    copy_tds.datasets[0].data = [];
    copy_fr.datasets[0].data = [];
    if (this.state.dataset) {
      this.state.dataset.forEach(doc => {
        copy.datasets[0].data.push(doc.ph)
        copy_turb.datasets[0].data.push(doc.turb)
        copy_tds.datasets[0].data.push(doc.TDS)
        copy_fr.datasets[0].data.push(doc.FR)
        //copy
        copy.datasets[0].data.push(doc.ph)
        copy_turb.datasets[0].data.push(doc.turb)
        copy_tds.datasets[0].data.push(doc.TDS)
        copy_fr.datasets[0].data.push(doc.FR)
      })
      this.setState({ data: copy, data_turb: copy_turb, data_tds: copy_tds, data_fr : copy_fr })
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
        
        {/* Page content */}
        <Container className="" fluid>
          <Row style={{ paddingTop: "100px" }}>
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
                    data={this.state.data_tds}
                    options={this.state.options_tds}
                  />
                </div>
              </CardBody>
            </Card>
            </div>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <div className="col-md-4">
            <Card style={{ backgroundColor: "#18214d" }}>
              <CardBody>
                {/* Chart */}
                <div className="chart" style={{ height: '290px', }}>
                  <HorizontalBar
                    data={this.state.data_fr}
                    options={this.state.options_fr}
                  />
                </div>
              </CardBody>
            </Card>
            </div>
            {/* <div className="col-md-4">
            <Card style={{ backgroundColor: "#18214d" }}>
              <CardBody>
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
                <div className="chart" style={{ height: '290px', }}>
                  <HorizontalBar
                    data={this.state.data_turb}
                    options={this.state.options_turb}
                  />
                </div>
              </CardBody>
            </Card>
            </div> */}
          </Row>
        </Container>
      </>
    );
  }
}

export default Charts;
