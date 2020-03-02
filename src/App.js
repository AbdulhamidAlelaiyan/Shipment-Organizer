/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React, {Component} from 'react';
import Shipments from "./components/Shipments";
import ShipmentTracker from "./components/ShipmentTracker";
import ShipmentAdder from "./components/ShipmentAdder";
import { Container, Col, Row, Button, Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarText } from 'reactstrap';
import axios from 'axios';
import Alerts from './components/Alerts';
import base from "./base";

/**
 * The App component that will be the first component mounted
 * @extends Component
 */
class App extends Component {
    /**
     * Deliver the props to the parent constructor and set the initial values of the state
     * @param props {Object} properties to be passed to the parent constructor
     */
    constructor(props) {
        super(props);
        /**
         * Set the initial values of the state
         * @type {{alertMessage: {message: string, status: string}, shipmentTrackingNumber: string, importantItems: Array<number>, shipmentsDelivered: Array<Object>, shipmentsInDelivery: Array<Object>, shipmentCheckpoints: Array<Object>}}
         */
        this.state = {
            shipmentsInDelivery: [],
            shipmentsDelivered: [],
            shipmentTrackingNumber: 'Please select a shipment to track',
            shipmentCheckpoints: [],
            importantItems: [],
            alertMessage: {message: '', status: ''},
        };
    }

    /**
     * Add a new shipment to the API Database
     * @param {number} tracking_number Shipment Tracking number
     * @param {string} nickname Nickname given to the shipment that will be synced with localstorage
     * @function
     */
    addNewShipment = (tracking_number, nickname) => {
        axios({
            method: 'post',
            url: 'https://api.aftership.com/v4/trackings',
            headers:
                {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',},
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
                        alertMessage: {message: 'Shipment Added', status: 'success'},
                    });
                }
                else {
                    this.setState({
                        shipmentsInDelivery: [...this.state.shipmentsInDelivery, response.data.data.tracking],
                        alertMessage: {message: 'Shipment Added', status: 'success'},
                    });
                }
            }))
            .catch(response => {
                console.log(response);
                this.setState({
                    alertMessage: {message: 'Error in Shipment Addition', status: 'danger'},
                });
            });
    };

    /**
     * Delete shipment from the api server database
     * @param {number} id The id given by the api to the shipment (not the shipment number)
     * @returns {void}
     * @function
     */
    deleteShipment = (id) => {
        axios({
            method: 'delete',
            url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${id}`,
            headers:
                {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',},
        })
            .then((response => {
                console.log('delete shipments', response.data);
                this.fetchShipments();
                this.setState({
                    alertMessage: {message: 'Shipment Deleted', status: 'danger'},
                });
            }))
            .catch(response => {
                console.log(response);
                this.setState({
                    alertMessage: {message: 'Error in Shipment Deletion', status: 'danger'},
                });
            });
    };

    /**
     * Delete all shipments from the api server database
     * @returns {void}
     * @function
     */
    deleteAllShipments = () => {
      const shipments = [...this.state.shipmentsDelivered, ...this.state.shipmentsInDelivery];
      shipments.forEach((shipment) => {
          axios({
              method: 'delete',
              url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${shipment.id}`,
              headers:
                  {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',},
          })
              .then((response => {
                  console.log('delete shipments', response.data);
                  this.fetchShipments();
                  this.setState({
                      alertMessage: {message: 'All Shipments Deleted', status: 'danger'},
                  });
              }))
              .catch(response => {
                  console.log(response);
                  this.setState({
                      alertMessage: {message: 'Error in deleting shipments', status: 'danger'},
                  });
              });
      });
    };

    /**
     * Delete in delivery shipments only
     * @return {void}
     * @function
     */
    deleteInDeliveryShipments = () => {
      const InDeliveryShipments = [...this.state.shipmentsInDelivery];
      InDeliveryShipments.forEach((shipment => {
          axios({
              method: 'delete',
              url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${shipment.id}`,
              headers:
                  {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',},
          })
              .then((response => {
                  console.log('delete shipments', response.data);
                  this.fetchShipments();
                  this.setState({
                      alertMessage: {message: 'All in Delivery Shipment Deleted', status: 'danger'},
                  });
              }))
              .catch(response => {
                  console.log(response);
                  this.setState({
                      alertMessage: {message: 'Error in deleting shipments', status: 'danger'},
                  });
              });
          this.fetchShipments();
      }));
    };

    /**
     * Delete delivered shipments from the api database
     * @returns {void}
     * @function
     */
    deleteDeliveredShipments = () => {
        const DeliveredShipments = [...this.state.shipmentsDelivered];
        DeliveredShipments.forEach((shipment => {
            axios({
                method: 'delete',
                url: `https://cors-anywhere.herokuapp.com/https://api.aftership.com/v4/trackings/${shipment.id}`,
                headers:
                    {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',},
            })
                .then((response => {
                    console.log('delete shipments', response.data);
                    this.fetchShipments();
                    this.setState({
                        alertMessage: {message: 'All Delivered Shipments deleted', status: 'danger'},
                    });
                }))
                .catch(response => {
                    console.log(response);
                    this.setState({
                        alertMessage: {message: 'Error in deleting shipments', status: 'danger'},
                    });
                });
        }));
    };

    /**
     * Delete unimportant shipments from the database server
     * @function
     */
    deleteAllUnImportantShipments = () => {
        this.state.shipmentsInDelivery.forEach(shipment =>  !this.state.importantItems.includes(shipment.id)
                                                            ? this.deleteShipment(shipment.id)
                                                            : null);
        this.state.shipmentsDelivered.forEach(shipment =>   !this.state.importantItems.includes(shipment.id)
                                                            ? this.deleteShipment(shipment.id)
                                                            : null);
    };

    /**
     *  Mark a shipment with specific id as important
     * @param {number} id The id of the shipment that will be marked
     * @returns {void}
     * @function
     */
    markImportant = (id) => {
        if(this.state.importantItems.includes(id)) {
            const importantItems = [... this.state.importantItems];
            importantItems[this.state.importantItems.indexOf(id)] = null;
            this.setState({importantItems,});
        }
        else this.setState({
            importantItems: [... this.state.importantItems, id],
        });
    };

    /**
     * A react lifecycle method that invoked when a component got mounted on the DOM
     */
     componentDidMount() {
         this.fetchShipments();

         this.ref = base.syncState('shipments', {
            context: this,
            state: 'importantItems',
            asArray:true,
        });

    }

    /**
     * A react lifecycle method that will be invoked when a component will be unmounted from the DOM
     */
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    /**
     * Fetch a single shipment of the user from the api database
     * @param {number} id ID of the shipment to be fetched
     * @returns {void}
     * @function
     */
    fetchShipmentTracking = (id) => {
        axios({
            method: 'get',
            url: `https://api.aftership.com/v4/trackings/${id}`,
            headers:
                {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',}
        })
            .then(response => {
                this.setState({
                    shipmentCheckpoints: response.data.data.tracking.checkpoints,
                });
            })
            .catch(response => {
                console.log(response);
            });
    };

    /**
     * Fetch all shipments from the api database
     * @returns {void}
     * @function
     */
    fetchShipments = () => {
        axios({
            method: 'get',
            url: 'https://api.aftership.com/v4/trackings',
            headers:
                {'aftership-api-key': 'a3065974-e0d2-4819-b187-44ec982ae9ad',}
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
            })
            .catch(response => {
                console.log(response);
                this.setState({
                    alertMessage: {message: 'Error in getting shipments', status: 'danger'},
                });
            });
    };

    /**
     * A react lifecycle methods invoked when the DOM get mounted and asks for the components inside to be
     * rendered.
     * @returns {*}
     */
    render() {
        return (
            <>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">📦{'         '}Shipments Organizer{'         '}📦</NavbarBrand>
                <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText><Button outline color='secondary' className='btn-sm' onClick={this.fetchShipments}>🔄</Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
            <Container>
                <Alerts alertMessage={this.state.alertMessage}/>
                <Row>
                    <Col xs='9' className='mt-5 text-center'><h5 className='mb-3'>Shipment Addition</h5><ShipmentAdder addNewShipment={this.addNewShipment}/></Col>
                    <Col className='mt-5 text-center ml-2'>
                        <h5 className='mb-3'>Shipment Deletion</h5>
                        <div className='border rounded p-2'>
                            <Button color='danger' className='mt-2 btn-block' onClick={this.deleteAllUnImportantShipments}>
                                Delete All Unimportant</Button>
                                <Button color='danger' className='mt-2 btn-block' onClick={this.deleteInDeliveryShipments}>Delete All In Delivery</Button>
                                <Button color='danger' className='mt-2 btn-block' onClick={this.deleteDeliveredShipments}>Delete All Delivered</Button>
                            <Button color='danger' className='mt-2 btn-block' onClick={this.deleteAllShipments}>Delete All</Button>
                        </div>
                    </Col>
                </Row>
                {/*<Row className='justify-content-center'>*/}
                {/*</Row>*/}
                <Row>
                    <Col className='mt-5 text-center'><h5>Shipments</h5><Shipments shipments={this.state.shipmentsInDelivery.concat(this.state.shipmentsDelivered)}
                                                                                           deleteShipment={this.deleteShipment} markImportant={this.markImportant}
                                                                                           importantItems={this.state.importantItems}
                                                                                           fetchShipmentTracking={this.fetchShipmentTracking}/></Col>
                    {/*<Col className='mt-5 text-center'><h5>Delivered Shipments</h5><Shipments shipments={this.state.shipmentsDelivered}*/}
                    {/*                                                                         deleteShipment={this.deleteShipment} markImportant={this.markImportant}*/}
                    {/*                                                                         importantItems={this.state.importantItems}*/}
                    {/*                                                                         fetchShipmentTracking={this.fetchShipmentTracking}/></Col>*/}
                </Row>
                <hr/>
                <ShipmentTracker shipmentCheckpoints={this.state.shipmentCheckpoints}/>
            </Container>
                </>
        );
    }
}

export default App;