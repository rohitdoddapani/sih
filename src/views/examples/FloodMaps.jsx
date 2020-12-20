
import React from "react";
import Mapbox from './Mapbox';
import './map.css';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";
import MapFlood from "./MapFloods";

class FloodMaps extends React.Component {
  render() {
    return (
      <>
        {/* <Header /> */}
        {/* Page content */}
        <Container className="" fluid style={{background: "linear-gradient(87deg, #11ccef, #1174ef)",paddingBottom:"20px"}}>
          <Row style={{paddingTop: "100px"}}>
            
            
            <div className="col ">
              <Card className="shadow border-0">
                
                <MapFlood />
        
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default FloodMaps;
