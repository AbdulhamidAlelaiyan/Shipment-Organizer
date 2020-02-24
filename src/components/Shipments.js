import React, {useLayoutEffect} from 'react';
import Shipment from './Shipment';
import {ListGroup} from "reactstrap";

export default class Shipments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            importantItems: [],
        };
    }

    markImportant = (id) => {
        if(this.state.importantItems.includes(id)) {
            const importantItems = [... this.state.importantItems];
            importantItems[this.state.importantItems.indexOf(id)] = null;
            this.setState({importantItems});
        }
        else this.setState({
            importantItems: [... this.state.importantItems, id],
        });
    };


    mapShipments = () => {
        return this.props.shipments.map((shipment, key) => {
            let important = false;
            if(this.state.importantItems.includes(shipment.id)) important = true;
           return <Shipment shipment={shipment} key={key} deleteShipment={this.props.deleteShipment}
                            markImportant={() => this.markImportant(shipment.id)} important={important}/>
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