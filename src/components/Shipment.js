import React from 'react';
import {Badge, ListGroupItem, Button} from "reactstrap";

export default class Shipment extends React.Component {
    render() {
        return (
          <>
              <ListGroupItem className={"justify-content-between" + (this.props.important ? ' bg-primary' : '')}>
                    <Badge className='mr-3'>{this.props.shipment.slug.toUpperCase()}</Badge>
                    {this.props.shipment.tracking_number}
                    <Badge pill className='ml-3'>{this.props.shipment.tag}</Badge>
                    <Button color='danger' className='ml-3 btn-sm'
                            onClick={() => this.props.deleteShipment(this.props.shipment.id)}>Delete</Button> {' '}
                    <Button className='btn-sm' color='primary' onClick={this.props.markImportant}>Important</Button>
              </ListGroupItem>
          </>
        );
    }
}