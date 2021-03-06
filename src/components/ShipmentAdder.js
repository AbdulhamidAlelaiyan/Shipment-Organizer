/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React, {Component} from 'react';
import {Input, Button, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * A component that responsible for getting new shipment data from the user and passing it to the App component
 * @extends React.Component
 */
class ShipmentAdder extends Component {
    /**
     * Deliver the props to the parent constructor and set the initial values of the state
     * @param props
     */
    constructor(props) {
        super(props);

        /**
         * Set the initial values of the state
         * @type {{NewShipmentNumber: number, NewShipmentNickname: string}}
         */
        this.state = {
            NewShipmentNumber: null,
            NewShipmentNickname: null,
        };
    }

    /**
     * Validator of data passed from a parent component
     * @type {{addNewShipment: {Function}}}
     */
    static propTypes = {
        addNewShipment: PropTypes.func.isRequired,
    };

    /**
     * Update the state value of NewShipmentNumber to the last value entered by the user
     * @param {Object} event
     * @function
     */
    updateNewShipmentNumber = (event) => this.setState({NewShipmentNumber: event.target.value});
    /**
     * Update the state value of NewShipmentNickname to the last value entered by the user
     * @param {Object} event
     * @function
     */
    updateNewShipmentNickname = (event) => this.setState({NewShipmentNickname: event.target.value});

    /**
     * A react lifecycle methods invoked when the DOM get mounted and asks for the components inside to be
     * rendered.
     * @returns {*}
     */
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