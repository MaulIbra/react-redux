import React, {Component} from 'react';
import {Navbar,Nav,Container} from "react-bootstrap";
import logo from '../assets/logo.png'
import {Link, withRouter} from "react-router-dom";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class HeaderComponent extends Component {
    handleLogout = ()=>{
        this.props.logout()
    }

    render() {
        console.log(this.props.history)
        return (

            <Navbar className="bg-white shadow-sm p-3">
                <Container>
                <Navbar.Brand className="mr-5">
                    <img
                        src={logo}
                        width="60"
                        height="60"
                        alt=""
                        className="d-inline-block p-2"
                    />
                    Maulana
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/home" className={this.props.history.location.pathname === '/home' ? "navigation-text-active" : "navigation-text"}>Home</Link>
                    <Link to="/menu" className={this.props.history.location.pathname === '/menu' ? "navigation-text-active" : "navigation-text"}>Menu</Link>
                </Nav>
                <Nav className="justify-content-end">
                    <label className="navigation-text" onClick={()=>this.handleLogout()}>Logout</label>
                    <FontAwesomeIcon className="m-auto" icon={faSignOutAlt} />
                </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default withRouter(HeaderComponent);