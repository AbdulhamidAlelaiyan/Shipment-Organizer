import React from 'react';
import {Badge, ListGroupItem} from "reactstrap";

export default class Shipment extends React.Component {
    render() {
        return (
          <>
              <ListGroupItem className="justify-content-between"><Badge>{this.props.shipment.slug.toUpperCase()}</Badge> {this.props.shipment.tracking_number} <Badge pill>{this.props.shipment.tag}</Badge></ListGroupItem>
          </>
        );
    }
}