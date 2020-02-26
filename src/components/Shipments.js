/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React, {useLayoutEffect} from 'react';
import Shipment from './Shipment';
import {ListGroup} from "reactstrap";
import PropTypes from 'prop-types';

/**
 * Shipments component is responsible for containing shipments components
 * @extends React.Component
 */
export default class Shipments extends React.Component {

    /**
     *
     * @type {{markImportant: {Function}, fetchShipmentTracking: {Function}, importantItems: {Array}, title: {String},
     * shipments: {Array<Object>}, deleteShipment: {Function}}}
     */
    static propTypes = {
        title: PropTypes.string.isRequired,
        shipments: PropTypes.array.isRequired,
        deleteShipment: PropTypes.func.isRequired,
        markImportant: PropTypes.func.isRequired,
        importantItems: PropTypes.array.isRequired,
        fetchShipmentTracking: PropTypes.func.isRequired,
    };

    /**
     * Map shipments objects into shipments components
     * @returns {Array}
     */
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

    /**
     * A react lifecycle methods invoked when the DOM get mounted and asks for the components inside to be
     * rendered.
     * @returns {*}
     */
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