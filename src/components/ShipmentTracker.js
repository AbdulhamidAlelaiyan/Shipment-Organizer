import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";

export default class ShipmentTracker extends React.Component {
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