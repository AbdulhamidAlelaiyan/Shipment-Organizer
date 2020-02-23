import React, {Component} from 'react';
import {Input, Button} from 'reactstrap';

class ShipmentAdder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newNumber: null,
        };
    }

    updateNewShipment = (event) => this.setState({newNumber: event.target.value});

    render() {
        return (
            <>
                New Shipment: <Input className='d-inline' onChange={this.updateNewShipment} type="text"/>
                <Button onClick={() => this.state.newNumber ? this.props.addNewShipment(this.state.newNumber) : null}
                        className='primary mt-1'>Add Shipment</Button>
            </>
        );
    }
}

export default ShipmentAdder;