import React, {Component} from 'react';
import {Card,Form} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import '../../App.css';
import loginIcon from "../../assets/login.svg"
import {login} from "./LoginService";
import {LoadingComponent} from "../../component/LodingComponent";
import Swal from "sweetalert2";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            error:""
        }
    }

    handleChangeInput = (event) =>{
        const name = event.target.name
        this.setState({...this.state, [name] : event.target.value})
    }

    validationEmail = (email)=>{
        // eslint-disable-next-line
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(String(email).toLowerCase());
    }

    validationForm = ()=>{
        return (this.state.email !== "" && this.state.password !== "" && this.validationEmail(this.state.email) === true)
    }

    handleLogin = ()=>{
        let user = {
            username : this.state.email,
            password: this.state.password
        }
        LoadingComponent()
        Swal.showLoading()
        login(user).then((result)=>{
            if (result.data.data === undefined){
                Swal.close()
                this.setState({
                    ...this.state,
                    error : result.data.message
                })
            }else{
                Swal.close()
                this.setState({
                    ...this.state,
                    error : ""
                })
                sessionStorage.setItem('token', result.data.data.authentication.token)
                this.props.onLogin()
            }
        }).catch((err)=>{
            Swal.close()
            console.log(err)

        })
    }

    render() {
        return (
            <Card className="shadow-lg bg-white rounded-sm card-style">
                <div className="header-card">
                    <img src={loginIcon} alt=""/>
                    Login Page
                </div>
                <Card.Body className="p-4">
                    <Form>
                        <InputComponent
                            inputType={"email"}
                            inputName={"email"}
                            inputLabel={"Email Adress"}
                            inputPlaceholder={"Enter Email"}
                            onChange={this.handleChangeInput}
                            isValidEmail={this.validationEmail(this.state.email)}
                            currentState={this.state.email}
                        />
                        <InputComponent
                            inputType={"password"}
                            inputName={"password"}
                            inputLabel={"Password"}
                            inputPlaceholder={"Enter password"}
                            onChange={this.handleChangeInput}
                        />
                        <div className="container-error">
                            <small className="text-danger">{this.state.error === ""?"":this.state.error}</small>
                        </div>
                        <div className="container-button">
                            <ButtonComponent btnLabel={"Login"} validation={this.validationForm()} click={this.handleLogin}/>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}


export default LoginForm;