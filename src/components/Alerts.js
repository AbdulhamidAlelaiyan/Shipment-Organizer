import React, {Component} from 'react';
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

class Alerts extends Component {
    static propTypes = {
        alertMessage: PropTypes.shape({
            status: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }).isRequired,
    };

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