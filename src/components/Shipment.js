/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React from 'react';
import {Badge, ListGroupItem, Button, Input, Row, Col} from "reactstrap";
import PropTypes from 'prop-types';

/**
 * Shipment component that will hold all the information about a specific shipment
 * @extends React.Component
 */
class Shipment extends React.Component {
    /**
     * Deliver the props to the parent constructor and set the initial values of the state
     * @param props
     */
    constructor(props) {
        super(props);

        /**
         * Set the initial values of the state
         * @type {{editor: boolean, newNickname: string}}
         */
        this.state = {
            editor: false,
            newNickname: localStorage.getItem(this.props.shipment.id),
        };
    }

    /**
     * A react lifecycle methods invoked when the DOM get mounted and asks for the components inside to be
     * rendered.
     * @returns {*}
     */
    render() {
        return (
          <>
              <ListGroupItem className={"justify-content-between"}>
                  <Row>
                      <Col lg='1'>
                        <Button outline color='success' className={'btn-sm mr-2' + (this.props.important ? ' bg-success' : '')} onClick={this.props.markImportant}>✅</Button>
                      </Col>
                      <Col lg='1'>
                        <Badge className='mr-3'>{this.props.shipment.slug.toUpperCase()}</Badge>
                      </Col>
                      <Col lg='4'>
                        <Button outline className='btn-block' onClick={() => this.props.fetchShipmentTracking(this.props.shipment.id)}>{this.props.shipment.tracking_number}</Button>
                      </Col>
                              {/*- {'  '}*/}
                      <Col lg='4'>
                      {     ! this.state.editor
                            ? <Button className='btn-block' outline onClick={() => this.setState({editor: !this.state.editor})}>{localStorage.getItem(this.props.shipment.id)}</Button>
                            : <form onSubmit={() => {localStorage.setItem(this.props.shipment.id, this.state.newNickname);
                                                     this.setState({editor: !this.state.editor})
                            }}>
                                <Input type='text' onChange={(event) => this.setState({newNickname: event.target.value})}
                                    value={this.state.newNickname}/>
                              </form>
                      }
                      </Col>
                      <Col lg='1'>
                        <Badge pill className='ml-3'>{this.props.shipment.tag}</Badge>
                      </Col>
                      <Col lg='1'>
                        <Button outline className='ml-3 btn-sm'
                                onClick={() => this.props.deleteShipment(this.props.shipment.id)}>✖️</Button> {' '}
                      </Col>
                  </Row>
              </ListGroupItem>
          </>
        );
    }
}

export default Shipment;