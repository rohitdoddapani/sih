
import React from "react";
import Mapbox from './Mapbox';
import './map.css';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";

class Maps extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                
                <Mapbox />
                {/* <img src="/mapv3.png" /> */}

              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Maps;
