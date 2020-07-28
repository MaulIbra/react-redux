import React from 'react'
import {useState} from 'react';
import {Card,Form} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import '../../App.css';
import loginIcon from "../../assets/login.svg"
import {login} from "./LoginService";
import {LoadingComponent} from "../../component/LodingComponent";
import Swal from "sweetalert2";

const LoginForm = (props) => {

    const [userInput,setUserInput] = useState({
        email : "",
        password : "",
        error : "",
    })

    const handleChangeInput = (name,val)=>{
        setUserInput({
            ...userInput,
            [name] : val
        })
    }

    const validationForm = ()=>{
        return (userInput.email !== "" && userInput.password !== "" && validationEmail(userInput.email) === true)
    }

    const validationEmail = (email)=>{
        // eslint-disable-next-line
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(String(email).toLowerCase());
    }

    const handleLogin = ()=>{
        let user = {
            username : userInput.email,
            password: userInput.password
        }
        LoadingComponent()
        Swal.showLoading()
        login(user).then((result)=>{
            if (result.data.data === undefined){
                Swal.close()
                setUserInput({
                    ...userInput,
                    error: result.data.message
                })
            }else{
                Swal.close()
                setUserInput({
                    ...userInput,
                    error: ""
                })
                sessionStorage.setItem('token', result.data.data.authentication.token)
                props.onLogin()
            }
        }).catch((err)=>{
            Swal.close()
            console.log(err)

        })
    }

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
                        onChange={e => {handleChangeInput("email",e.target.value)}}
                        isValidEmail={validationEmail(userInput.email)}
                        currentState={userInput.email}
                    />
                    <InputComponent
                        inputType={"password"}
                        inputName={"password"}
                        inputLabel={"Password"}
                        inputPlaceholder={"Enter password"}
                        onChange={e => {handleChangeInput("password",e.target.value)}}
                    />
                    <div className="container-error">
                        <small className="text-danger">{userInput.error === ""?"":userInput.error}</small>
                    </div>
                    <div className="container-button">
                        <ButtonComponent btnLabel={"Login"} validation={validationForm()} click={()=>handleLogin()}/>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default LoginForm;
