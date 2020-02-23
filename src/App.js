import React, {Component} from 'react';
import Shipments from "./components/Shipments";

class App extends Component {
    render() {
        return (
            <>
                <h1>Shipment Organizer</h1>
                <Shipments/>
            </>
        );
    }
}

export default App;