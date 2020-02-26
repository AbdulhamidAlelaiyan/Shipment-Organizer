/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React, {useLayoutEffect} from 'react';
import Shipment from './Shipment';
import {ListGroup} from "reactstrap";
import PropTypes from 'prop-types';

export default class Shipments extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        shipments: PropTypes.array.isRequired,
        deleteShipment: PropTypes.func.isRequired,
        markImportant: PropTypes.func.isRequired,
        importantItems: PropTypes.array.isRequired,
        fetchShipmentTracking: PropTypes.func.isRequired,
    };

    mapShipments = () => {
        return this.props.shipments.map((shipment, key) => {
            let important = false;
            if(this.props.importantItems.includes(shipment.id)) important = true;
           return <Shipment shipment={shipment}
                            key={key}
                            deleteShipment={this.props.deleteShipment}
                            markImportant={() => this.props.markImportant(shipment.id)}
                            important={important}
                            fetchShipmentTracking={this.props.fetchShipmentTracking}/>
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