import React, {Component} from 'react';
import {Alert} from 'reactstrap';

class Alerts extends Component {
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