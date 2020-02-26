/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React from 'react';
import {Badge, ListGroupItem, Button, Input} from "reactstrap";
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
              <ListGroupItem className={"justify-content-between" + (this.props.important ? ' bg-primary' : '')}>
                    <Badge className='mr-3'>{this.props.shipment.slug.toUpperCase()}</Badge>
                    <span onClick={() => this.props.fetchShipmentTracking(this.props.shipment.id)}>{this.props.shipment.tracking_number}</span> ||
                  {     ! this.state.editor
                        ? <span onClick={() => this.setState({editor: !this.state.editor})}>{localStorage.getItem(this.props.shipment.id)}</span>
                        : <form onSubmit={() => {localStorage.setItem(this.props.shipment.id, this.state.newNickname);
                                                 this.setState({editor: !this.state.editor})
                        }}>
                            <Input type='text' onChange={(event) => this.setState({newNickname: event.target.value})}
                                value={this.state.newNickname}/>
                          </form>
                  }
                    <Badge pill className='ml-3'>{this.props.shipment.tag}</Badge>
                    <Button color='danger' className='ml-3 btn-sm'
                            onClick={() => this.props.deleteShipment(this.props.shipment.id)}>Delete</Button> {' '}
                    <Button className='btn-sm' color='primary' onClick={this.props.markImportant}>Important</Button>
              </ListGroupItem>
          </>
        );
    }
}

export default Shipment;