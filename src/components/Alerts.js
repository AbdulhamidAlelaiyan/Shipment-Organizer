import React, {Component} from 'react';
import {Alert} from 'reactstrap';

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        }
    }

    render() {
        return (
            <>
                <Alert color="primary">
                    This is a primary alert — check it out!
                </Alert>
            </>
        );
    }
}

export default Alerts;