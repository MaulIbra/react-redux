import image from "../../assets/admin_icon.svg"
import {Container} from "react-bootstrap";
import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            <Container className="container-home">
                <div className="container-image">
                    <img className="image-home" src={image} alt=""/>
                </div>
                <div className="container-text">
                    <h2>Selamat Datang Di Website Pengelolaan data Kedai Mas Maul</h2>
                </div>
            </Container>
        );
    }
}


export default Home;