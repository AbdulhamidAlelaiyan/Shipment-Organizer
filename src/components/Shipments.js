import React, {useLayoutEffect} from 'react';
import Shipment from './Shipment';
import {ListGroup} from "reactstrap";

export default class Shipments extends React.Component {

    mapShipments = () => {
        return this.props.shipments.map((shipment, key) => {
           return <Shipment trackingNumber={shipment.tracking_number} key={key}/>
        });
    };

    render() {
        return (
          <>
              <h5 className='mt-5'>{this.props.title}</h5>
              <ListGroup>
                  {this.mapShipments()}
              </ListGroup>
          </>
        );
    }
}