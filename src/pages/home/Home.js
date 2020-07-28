import image from "../../assets/admin_icon.svg"
import {Container} from "react-bootstrap";
import React, {Component} from 'react';
import Swal from "sweetalert2";
import {getCategory} from "../category/CategoryService";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setListCategory} from "../../actions/Category";

class Home extends Component {

    loadCategory = ()=>{
        getCategory(sessionStorage.getItem('token')).then((result)=>{
            this.props.setListCategory(result.data)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session End!',
            }).then((result)=>{
                if (result.value) {
                    sessionStorage.clear()
                    this.props.history.push('/')
                }
            })
        })
    }

    componentDidMount() {
        this.loadCategory()
    }


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

const mapDispatchToProps = {
    setListCategory : setListCategory
}


export default connect(null,mapDispatchToProps)(withRouter(Home));