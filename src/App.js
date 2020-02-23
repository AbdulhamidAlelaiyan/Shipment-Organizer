import React, {Component} from 'react';
import Shipments from "./components/Shipments";
import ShipmentTracker from "./components/ShipmentTracker";
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';

class App extends Component {
    render() {
        return (
            <Container>
                <h1 className='text-center'>📦Shipments Organizer📦</h1>
                <Row>
                    <Col><Shipments title='shipments on the way'/></Col>
                    <Col><Shipments title='shipments delivered'/></Col>
                </Row>
                <hr/>
                <ShipmentTracker title='shipment checkpoint' shipmentId={null}/>
            </Container>
        );
    }
}

export default App;