/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";

/**
 * A component that responsible for showing the checkpoints of a specific shipment
 * @extends React.Component
 */
class ShipmentTracker extends React.Component {
    /**
     * A react lifecycle methods invoked when the DOM get mounted and asks for the components inside to be
     * rendered.
     * @returns {*}
     */
    render() {
        return (
          <>
              <ListGroup className='mb-5'>
                  {this.props.shipmentCheckpoints.map((checkpoint =>
                  <ListGroupItem >
                        {checkpoint.location}
                  <br/> {checkpoint.message}
                  <br/> {checkpoint.checkpoint_time}
                  </ListGroupItem>))}
              </ListGroup>
          </>
        );
    }
}

export default ShipmentTracker;