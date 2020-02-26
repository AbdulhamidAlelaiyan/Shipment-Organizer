/**
 * @file App.js is the root react component for the app
 * @author Abdulhamid Alelaiyan
 * @see <a href="https://github.com/AbdulhamidAlelaiyan/Shipment-Organizer"></a>
 */
import React, {Component} from 'react';
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * A component that responsible for showing alerts send from the parent component (App)
 * @extends React.Component
 */
class Alerts extends Component {
    /**
     * Validator of data passed from a parent component
     */
    static propTypes = {
        alertMessage: PropTypes.shape({
            status: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }).isRequired,
    };

    /**
     * A react lifecycle methods invoked when the DOM get mounted and asks for the components inside to be
     * rendered.
     * @returns {*}
     */
    render() {
        if(this.props.alertMessage.message) return (
            <>
                <Alert color={this.props.alertMessage.status}>
                    {this.props.alertMessage.message}
                </Alert>
            </>
        );
        else return null;
    }
}

export default Alerts;