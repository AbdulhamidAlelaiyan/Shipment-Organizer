import React, {useLayoutEffect} from 'react';
import Shipment from './Shipment';
import {Badge, ListGroup, ListGroupItem} from "reactstrap";

export default class Shipments extends React.Component {
    render() {
        return (
          <>
              <h5 className='mt-5'>{this.props.title}</h5>
              <ListGroup>
                  <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
                  <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
              </ListGroup>
          </>
        );
    }
}