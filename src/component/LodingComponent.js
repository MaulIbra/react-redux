import React, {Component} from 'react';
import loading from '../assets/loading.gif'
import {Container} from "react-bootstrap";

class LodingComponent extends Component {
    render() {
        return (
            <Container className="loading-component">
                <img src={loading} alt="loading..." />
            </Container>
        );
    }
}

export default LodingComponent;