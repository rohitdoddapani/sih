
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
    divDetails:null
  };
  componentDidMount(){
    //Receiving data from props at Tables.jsx
    var x = this.props.location.state.deviceid;
    //console.log(this.props.location.state,x);
    //Fetching data from firestore from document id as device id of user
    const db = fire.firestore()
    db.collection("devices").doc(`${x}`).get().then( snapshot => {
      const users = [];
      //console.log(snapshot.data());
      const values = Object.values(snapshot.data());
      const keys = Object.keys(snapshot.data());
      for(var i=0;i<keys.length;i++){
        var k = keys[i];
        var v = values[i];
        users[k]=v;
      }
      this.setState({divDetails: Array(users)})
    })
    .catch(err => console.log(err));
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

          
          <Row style={{background: '#00bfff'}}>
          { this.state.divDetails &&
                this.state.divDetails.map(div => {
                  return (
            <Col className="" style={{marginTop: '100px'}}>
              
              <Col  >
                <Card className="card-stats mb-2" style={{ margin: '0px -13px 0px -15px' }}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {this.state.divDetails}
                          User
                          </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {this.props.location.state.name}
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
                        {this.props.location.state.deviceid}
                        </span>{" "}

                    </p>
                  </CardBody>
                </Card>
              </Col>
              
                    <Row>
                    <Col >
                      <Card className="card-stats mb-4">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Leakages
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {div.leakes}
                              </span>
                            </div>

                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">

                            <span className="text-nowrap">Since last year</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col >
                      <Card className="card-stats mb-4">
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
                                {div.bill}
                              </span>
                            </div>

                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">

                            <span className="text-nowrap">Since last month</span>
                          </p>
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
                            {div.ph}
                          </span>
                        </div>

                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">

                        <span className="text-nowrap">Since last month</span>
                      </p>
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
                            {div.turbidity}
                          </span>
                        </div>

                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">

                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            )
          })}
            <Col className="mb-6 mb-xl-0" xl="7" style={{marginTop: '100px'}}>
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


        </Container>
      </>
    );
  }
}

export default Userdata;
