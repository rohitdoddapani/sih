
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import fire from '../../config/Fire';
class Header extends React.Component {

  state={
    value: 0,
    qty: 2000,
  };
  // componentDidMount(){
  //   for(var i=1;i<4;i++){
  //     setTimeout(() => {
  //       this.setState({value: i*10})
  //     }, 3000);
  //   }
    
  // };
  x=2000
  min = 20;
  max = 50;

 

  tick() {
    this.setState(state => ({
      qty: this.x + Math.floor(Math.random() * (this.max - this.min))
    }));
    this.x=this.state.qty;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({value: 1})
    }, 10000);
    this.interval = setInterval(() => this.tick(), 2000);
    const db = fire.firestore()
    db.collection("globals").get().then( snapshot => {
      const users = [];
      console.log(snapshot);
      snapshot.forEach(doc => {
          console.log(doc.data());
          users.push(doc.data())
        });
      this.setState({globals: users})
    })
    .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Leak Alerts 
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.globals? this.state.globals[0].current_leaks : ""}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Connections
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.globals? this.state.globals[0].users : ""}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total usage
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.globals? this.state.globals[0].water_usage: ""} L</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                {/* <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Water Qty
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            73.65
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p> 
                    </CardBody>
                  </Card>
                </Col> */}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
