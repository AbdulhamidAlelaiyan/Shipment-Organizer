import React from 'react';
import {Badge, ListGroupItem} from "reactstrap";

export default class Shipment extends React.Component {
    render() {
        return (
          <>
              <ListGroupItem className="justify-content-between">{this.props.trackingNumber} <Badge pill>Badge</Badge></ListGroupItem>
          </>
        );
    }
}