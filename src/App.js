import React, {Component} from 'react';
import Shipments from "./components/Shipments";
import ShipmentTracker from "./components/ShipmentTracker";
import ShipmentAdder from "./components/ShipmentAdder";
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shipmentsInDelivery: [],
            shipmentsDelivered: [],
            shipmentId: 'Please select a shipment to track',
        }
    }

    addNewShipment = (tracking_number) => {
        axios({
            method: 'post',
            url: 'https://api.aftership.com/v4/trackings',
            headers:
                {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',},
            data: {
                tracking: {
                    tracking_number,
                },
            }
        })
            .then((response => {
                console.log(response.data);
            }))
            .catch(response => {
                console.log(response);
            });
        this.fetchShipments();
    };

    deleteShipment = (id) => {
        axios({
            method: 'delete',
            url: `https://api.aftership.com/v4/trackings/${id}`,
            headers:
                {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',},
        })
            .then((response => {
                console.log(response.data);
            }))
            .catch(response => {
                console.log(response);
            });
        this.fetchShipments();
    };

    componentDidMount() {
        this.fetchShipments();
    }

    fetchShipments = () => {
        axios({
            method: 'get',
            url: 'https://api.aftership.com/v4/trackings',
            headers:
                {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',}
        })
            .then(response => {
                const shipments = response.data.data.trackings;
                // console.log(shipments);
                const shipmentsDelivered = shipments.filter((shipment) => shipment.tag === 'Delivered');
                const shipmentsInDelivery = shipments.filter((shipment) => shipment.tag !== 'Delivered');
                this.setState({
                    shipmentsInDelivery,
                    shipmentsDelivered,
                });
            })
            .catch(response => {
                console.log(response);
            });
    };

    render() {

        return (
            <Container>
                <h1 className='text-center'>📦Shipments Organizer📦</h1>
                <Row>
                    <ShipmentAdder addNewShipment={this.addNewShipment}/>
                </Row>
                <Row>
                    <Col><Shipments title='shipments on the way' shipments={this.state.shipmentsInDelivery}
                                    deleteShipment={this.deleteShipment}/></Col>
                    <Col><Shipments title='shipments delivered' shipments={this.state.shipmentsDelivered}
                                    deleteShipment={this.deleteShipment}/></Col>
                </Row>
                <hr/>
                <ShipmentTracker title='shipment checkpoint' shipmentId={this.state.shipmentId}/>
            </Container>
        );
    }
}

export default App;