import React, {Component} from 'react';
import Shipments from "./components/Shipments";
import ShipmentTracker from "./components/ShipmentTracker";
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shipments: [],
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://api.aftership.com/v4/trackings',
            headers:
                {'aftership-api-key': '8742d0d1-9845-4c2f-8dfa-ed28c3430c2a',}
        })
            .then(response => {
                const shipments = response.data.data.trackings;
                // console.log(shipments);
                this.setState({
                    shipments,
                })
            })
            .catch(response => {
                console.log(response)
            });
    }

    render() {

        return (
            <Container>
                <h1 className='text-center'>📦Shipments Organizer📦</h1>
                <Row>
                    <Col><Shipments title='shipments on the way' shipments={this.state.shipments}/></Col>
                    <Col><Shipments title='shipments delivered' shipments={this.state.shipments}/></Col>
                </Row>
                <hr/>
                <ShipmentTracker title='shipment checkpoint' shipmentId={null}/>
            </Container>
        );
    }
}

export default App;