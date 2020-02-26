/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React, {Component} from 'react';
import {Input, Button, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';

class ShipmentAdder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NewShipmentNumber: null,
            NewShipmentNickname: null,
        };
    }

    static propTypes = {
        addNewShipment: PropTypes.func.isRequired,
    };

    updateNewShipmentNumber = (event) => this.setState({NewShipmentNumber: event.target.value});
    updateNewShipmentNickname = (event) => this.setState({NewShipmentNickname: event.target.value});

    render() {
        return (
            <Row className='align-items-center justify-content-center'>
                <Col>New Shipment: <Input onChange={this.updateNewShipmentNumber} type="text"/></Col>
                <Col>Nickname:     <Input onChange={this.updateNewShipmentNickname} type="text"/></Col>

                <Col><Button onClick={() => this.state.NewShipmentNumber && this.state.NewShipmentNickname
                    ? this.props.addNewShipment(this.state.NewShipmentNumber, this.state.NewShipmentNickname)
                    : null}
                        className='primary mt-3'>Add Shipment</Button>
                </Col>
            </Row>
        );
    }
}

export default ShipmentAdder;