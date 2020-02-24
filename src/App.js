import React, {Component} from 'react';
import Shipments from "./components/Shipments";
import ShipmentTracker from "./components/ShipmentTracker";
import ShipmentAdder from "./components/ShipmentAdder";
import { Container, Col, Row, Button } from 'reactstrap';
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

    addNewShipment = (tracking_number, nickname) => {
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
                console.log('add new shipments' , response.data);
                localStorage.setItem(response.data.data.tracking.id, nickname);
                if(response.data.data.tracking.tag === 'Delivered') {
                    this.setState({
                        shipmentsDelivered: [...this.state.shipmentsDelivered, response.data.data.tracking],
                    });
                }
                else {
                    this.setState({
                        shipmentsInDelivery: [...this.state.shipmentsInDelivery, response.data.data.tracking],
                    });
                }
            }))
            .catch(response => {
                console.log(response);
            });
    };

    deleteShipment = (id) => {
        axios({
            method: 'delete',
            url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${id}`,
            headers:
                {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',},
        })
            .then((response => {
                console.log('delete shipments', response.data);
                this.fetchShipments();
            }))
            .catch(response => {
                console.log(response);
            });
    };

    deleteAllShipments = () => {
      const shipments = [...this.state.shipmentsDelivered, ...this.state.shipmentsInDelivery];
      shipments.forEach((shipment) => {
          axios({
              method: 'delete',
              url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${shipment.id}`,
              headers:
                  {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',},
          })
              .then((response => {
                  console.log('delete shipments', response.data);
                  this.fetchShipments();
              }))
              .catch(response => {
                  console.log(response);
              });
      });
    };

    deleteInDeliveryShipments = () => {
      const InDeliveryShipments = [...this.state.shipmentsInDelivery];
      InDeliveryShipments.forEach((shipment => {
          axios({
              method: 'delete',
              url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${shipment.id}`,
              headers:
                  {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',},
          })
              .then((response => {
                  console.log('delete shipments', response.data);
                  this.fetchShipments();
              }))
              .catch(response => {
                  console.log(response);
              });
          this.fetchShipments();
      }));
    };

    deleteDeliveredShipments = () => {
        const DeliveredShipments = [...this.state.shipmentsDelivered];
        DeliveredShipments.forEach((shipment => {
            axios({
                method: 'delete',
                url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${shipment.id}`,
                headers:
                    {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',},
            })
                .then((response => {
                    console.log('delete shipments', response.data);
                    this.fetchShipments();
                }))
                .catch(response => {
                    console.log(response);
                });
        }));
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
                console.log('fetch shipments:', shipments);
                const shipmentsDelivered = shipments.filter((shipment) => shipment.tag === 'Delivered');
                const shipmentsInDelivery = shipments.filter((shipment) => shipment.tag !== 'Delivered');
                this.setState({
                    shipmentsInDelivery,
                    shipmentsDelivered,
                });
                console.log('set state was called');
            })
            .catch(response => {
                console.log(response);
            });
    };

    render() {
        return (
            <Container>
                <h1 className='text-center'>📦Shipments Organizer📦</h1>
                <ShipmentAdder addNewShipment={this.addNewShipment}/>
                <Row className='justify-content-center'>
                    <Button color='success'  className='mt-5' onClick={this.fetchShipments}>Refresh Shipment Data</Button>
                </Row>
                <Row>
                    <Col><Shipments title='shipments on the way' shipments={this.state.shipmentsInDelivery}
                                    deleteShipment={this.deleteShipment}/></Col>
                    <Col><Shipments title='shipments delivered' shipments={this.state.shipmentsDelivered}
                                    deleteShipment={this.deleteShipment}/></Col>
                </Row>
                <Row>
                    <Col>
                        <Button color='danger' className='mt-2' onClick={this.deleteInDeliveryShipments}>Delete All In Delivery Shipments</Button>
                    </Col>
                    <Col>
                        <Button color='danger' className='mt-2' onClick={this.deleteDeliveredShipments}>Delete All Delivered Shipments</Button>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                        <Button color='danger' className='mt-5 text-center' onClick={this.deleteAllShipments}>!!! Delete All Shipments !!!</Button>
                </Row>
                <hr/>
                <ShipmentTracker title='shipment checkpoint' shipmentId={this.state.shipmentId}/>
            </Container>
        );
    }
}

export default App;