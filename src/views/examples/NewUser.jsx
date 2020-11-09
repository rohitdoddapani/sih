
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import fire from '../../config/Fire';
import CoolTabs from 'react-cool-tabs';
import './custom.css'

class Content1 extends React.Component {
    render() {
      return <div >
        <CardBody>
            <Form>
            <h6 className="heading-small text-muted mb-4">
                User information
            </h6>
            <div className="pl-lg-4">
                <Row>
                <Col lg="6">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-username"
                    >
                        NodeID
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-username"
                        placeholder="Device Id"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                <Col lg="6">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-email"
                    >
                        Email address
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-email"
                        placeholder="jesse@example.com"
                        type="email"
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col lg="6">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                    >
                        First name
                    </label>
                    <Input
                        className="form-control-alternative"
                        defaultValue="Lucky"
                        id="input-first-name"
                        placeholder="First name"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                <Col lg="6">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                    >
                        Last name
                    </label>
                    <Input
                        className="form-control-alternative"
                        defaultValue="Jesse"
                        id="input-last-name"
                        placeholder="Last name"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col lg="6">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-ph"
                    >
                        Phone Number
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-ph"
                        placeholder="Phone Number"
                        type="number"
                    />
                    </FormGroup>
                </Col>
                <Col lg="6">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-password"
                    >
                        Password
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-password"
                        placeholder="password"
                        type="password"
                    />
                    </FormGroup>
                </Col>
                </Row>
            </div>
            <hr className="my-4" />
            {/* Address */}
            <h6 className="heading-small text-muted mb-4">
                Contact information
            </h6>
            <div className="pl-lg-4">
                <Row>
                <Col md="12">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-address"
                    >
                        Address
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-address"
                        placeholder="Home Address"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col lg="3">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-city"
                    >
                        City
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-city"
                        placeholder="City"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                <Col lg="3">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-state"
                    >
                        State
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-state"
                        placeholder="state"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                <Col lg="3">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-country"
                    >
                        Country
                    </label>
                    <Input
                        className="form-control-alternative"
                        defaultValue="India"
                        id="input-country"
                        placeholder="Country"
                        type="text"
                    />
                    </FormGroup>
                </Col>
                
                <Col lg="3">
                    <FormGroup>
                    <label
                        className="form-control-label"
                        htmlFor="input-postal-code"
                    >
                        Postal code
                    </label>
                    <Input
                        className="form-control-alternative"
                        id="input-postal-code"
                        placeholder="Postal code"
                        type="number"
                    />
                    </FormGroup>
                </Col>
                </Row>
            </div>
            <hr className="my-4" />
            <div className="text-center">
                <Button
                    color="primary"
                    onClick={e => e.preventDefault()}
                >
                    Submit
                </Button>
            </div>
            </Form>
        </CardBody>
      </div>
    }
  }
  class Content2 extends React.Component {
    render() {
      return <div >
      <CardBody>
          <Form>
          <h6 className="heading-small text-muted mb-4">
              Node information
          </h6>
          <div className="pl-lg-4">
              <Row>
              <Col lg="6">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-username"
                  >
                      NodeID
                  </label>
                  <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder="Device Id"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              <Col lg="6">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-email"
                  >
                      Email address
                  </label>
                  <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="jesse@example.com"
                      type="email"
                  />
                  </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col lg="6">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-latitude"
                  >
                      Latitude
                  </label>
                  <Input
                      className="form-control-alternative"
                      defaultValue="Lucky"
                      id="input-latitude"
                      placeholder="Latitude"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              <Col lg="6">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-longitude"
                  >
                      Longitude
                  </label>
                  <Input
                      className="form-control-alternative"
                      defaultValue="Jesse"
                      id="input-longitude"
                      placeholder="Last name"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              </Row>
          </div>
          <hr className="my-4" />
          {/* Address */}
          <h6 className="heading-small text-muted mb-4">
              Contact information
          </h6>
          <div className="pl-lg-4">
              <Row>
              <Col md="12">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-address"
                  >
                      Address
                  </label>
                  <Input
                      className="form-control-alternative"
                      id="input-address"
                      placeholder="Home Address"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col lg="3">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-city"
                  >
                      City
                  </label>
                  <Input
                      className="form-control-alternative"
                      id="input-city"
                      placeholder="City"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              <Col lg="3">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-state"
                  >
                      State
                  </label>
                  <Input
                      className="form-control-alternative"
                      id="input-state"
                      placeholder="state"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              <Col lg="3">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-country"
                  >
                      Country
                  </label>
                  <Input
                      className="form-control-alternative"
                      defaultValue="India"
                      id="input-country"
                      placeholder="Country"
                      type="text"
                  />
                  </FormGroup>
              </Col>
              
              <Col lg="3">
                  <FormGroup>
                  <label
                      className="form-control-label"
                      htmlFor="input-postal-code"
                  >
                      Postal code
                  </label>
                  <Input
                      className="form-control-alternative"
                      id="input-postal-code"
                      placeholder="Postal code"
                      type="number"
                  />
                  </FormGroup>
              </Col>
              </Row>
          </div>
          <hr className="my-4" />
          <div className="text-center">
              <Button
                  color="primary"
                  onClick={e => e.preventDefault()}
              >
                  Submit
              </Button>
          </div>
          </Form>
      </CardBody>
    </div>
    }
  }

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.fetchData();
    this.state = ({
      users:null
    });
  }
  fetchData = async () => {
    const db = fire.firestore()
    db.collection("Users").get().then( snapshot => {
      const users = []
      snapshot.forEach(doc => {
        const data = doc.data()
        users.push(data)
      })
      this.setState({users: users});
      //console.log(this.state.users);
    })
    .catch(err => console.log(err));
    
  }
  handleClick() {
    this.props.history.push('/admin/userdata');
  }

  render() {

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          
        {/* Page content */}
        <Container className="mt-30" fluid>
            <CoolTabs
                tabKey={'1'}
                style={{ width:  1000, height:  800, background:  'white' }}
                activeTabStyle={{ background:  'blue', color:  'white' }}
                unActiveTabStyle={{ background:  'lightblue', color:  'black' }}
                activeLeftTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
                activeRightTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
                
                
                leftTabTitle={'New User'}
                rightTabTitle={'New Node'}
                leftContent={<Content1/>}
                rightContent={<Content2/>}
                contentTransitionStyle={'transform 0.6s ease-in'}
                borderTransitionStyle={'all 0.6s ease-in'}
            />
          
        </Container>
        </div>
      </>
    );
  }
}

export default NewUser;
