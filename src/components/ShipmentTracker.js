import React from 'react';
import {ListGroup} from "reactstrap";

export default class ShipmentTracker extends React.Component {
    render() {
        return (
          <>
              <h1 className='text-center'>{this.props.shipmentId}</h1>
              <ListGroup>
              </ListGroup>
          </>
        );
    }
}