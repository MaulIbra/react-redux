import React, {Component} from 'react';
import {Navbar,Nav} from "react-bootstrap";
import logo from '../assets/logo.png'
import {Link} from "react-router-dom";

class HeaderComponent extends Component {
    handleLogout = ()=>{
        this.props.logout()
    }

    render() {
        return (
            <Navbar className="bg-white shadow-sm p-3">
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        alt=""
                        className="d-inline-block p-2"
                    />
                    Maulana
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/menu">Menu</Link></Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Link onClick={()=>this.handleLogout()}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default HeaderComponent;