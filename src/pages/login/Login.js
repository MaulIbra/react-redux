import LoginForm from "./LoginForm";
import React from 'react';

const Login = (props) => {

    const onLogin = ()=>{
        props.onLogin()
    }

    return (
        <div className="login-pages">
            <div className="login-form">
                <LoginForm onLogin={()=>onLogin()}/>
            </div>
        </div>
    );
};

export default Login;
