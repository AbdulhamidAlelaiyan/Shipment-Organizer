import React, {useLayoutEffect} from 'react';
import Shipment from './Shipment';
import {ListGroup} from "reactstrap";

export default class Shipments extends React.Component {
    mapShipments = () => {
        return this.props.shipments.map((shipment, key) => {
            let important = false;
            if(this.props.importantItems.includes(shipment.id)) important = true;
           return <Shipment shipment={shipment} key={key} deleteShipment={this.props.deleteShipment}
                            markImportant={() => this.props.markImportant(shipment.id)} important={important}/>
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